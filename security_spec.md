# Security Specification and Threat Model: Workout Tracker App

## 1. Data Invariants
- **WorkoutLog Validation shape**: Every valid workout log record inside `/workoutLogs/{logId}` must strictly possess the keys `id`, `workoutId`, `title`, `dateString`, `timestamp`, `durationMinutes`, `target`, and `thumbnail`. No extra keys (no shadow field injections) are permitted.
- **Path Verification**: The document ID `{logId}` must be a valid ID matching alphanumeric standards under 128 characters.
- **Type constraints**:
  - `id`: String under 128 chars.
  - `workoutId`: String under 128 chars.
  - `title`: String under 256 chars.
  - `dateString`: String under 32 chars.
  - `timestamp`: Numeric timestamp payload.
  - `durationMinutes`: Numeric duration value.
  - `target`: String under 128 chars.
  - `thumbnail`: URL string under 2048 chars.

---

## 2. The "Dirty Dozen" Payloads
These 12 payloads represent malicious attempts to bypass validation, infect data, or cause Denial of Wallet:

1. **The Poison ID (Resource Poisoning)**: Document path variable `logId` contains a massive 100KB string representation filled with invalid symbols to exhaust storage paths.
2. **Shadow Field Injection**: Writing a log that includes an extra admin privileges flag (`"isAdmin": true`) or other unmodeled properties.
3. **Missing Critical Data**: Initializing a workout log without the mandatory `"durationMinutes"` property.
4. **Invalid DataType (Value Poisoning - Boolean instead of String)**: Setting `"title": true` instead of a string.
5. **Too Long Title (Denial of Wallet)**: Setting `"title"` to a massive 1MB string to saturate document size limits.
6. **Negative Duration Bounds**: Setting `"durationMinutes": -120` to degrade query statistics.
7. **Malformed Date String**: Setting `"dateString"` to deep nested arrays to crack indexing.
8. **Incompatible Schema Mapping**: Specifying invalid empty map array parameters.
9. **Zero Timestamp**: Scurrying the log with completely zero or invalid negative numbers.
10. **Unauthenticated Admin Escape Threat**: Writing without checking types assuming a default bypass is in play.
11. **Huge Thumbnail URL Payload**: Feeding a 5MB text payload as a `"thumbnail"` parameter.
12. **Truncated/Missing Array Fields**: Specifying incorrect string keys.

---

## 3. Threat Assessment / Red Team Table

| Attack Scenario | Vector | Guard Pattern | Verdict |
|---|---|---|---|
| ID Poisoning | Junk document ID strings | `isValidId(logId)` checks | **DENIED** |
| Shadow fields | `Ghost Field` injection | Strict `data.keys().size() == 8` and `hasAll()` | **DENIED** |
| Resource Exhaustion | 1MB string inputs | `.size() <= n` validations | **DENIED** |
| State Shortcutting | Null status or types | Strict type mapping constraints | **DENIED** |

---

## 4. Test Runner Blueprint (`firestore.rules.test.ts`)
```typescript
import { assertFails } from '@firebase/rules-unit-testing';

// Verification wrapper testing for strict execution blocks
describe('Workout Tracker - Security Rule Tests', () => {
  it('rejects the shadow update payload', async () => {
    // Attempt shadow fields with unmodeled "Ghost Fields"
    const badPayload = {
      id: "log-1",
      workoutId: "workout-core",
      title: "Core training",
      dateString: "2026.06.21",
      timestamp: 12345678,
      durationMinutes: 15,
      target: "Core",
      thumbnail: "https://example.com/thumb.png",
      ghostField: "sneaky-write"
    };
    await assertFails(db.collection('workoutLogs').doc('logId-1').set(badPayload));
  });
});
```
