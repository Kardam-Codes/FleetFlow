const test = require("node:test");
const assert = require("node:assert/strict");

const {
  validateTripCreate,
  validateTripComplete,
} = require("../validations/trip.validation");
const { validateDriverStatusUpdate } = require("../validations/driver.validation");


test("validateTripCreate rejects missing start_odometer", () => {
  assert.throws(
    () => validateTripCreate({
      vehicle_id: "vehicle-id",
      driver_id: "driver-id",
      cargo_weight: 100,
    }),
    /Start odometer is required/
  );
});


test("validateTripCreate allows valid payload", () => {
  assert.doesNotThrow(() => validateTripCreate({
    vehicle_id: "vehicle-id",
    driver_id: "driver-id",
    cargo_weight: 100,
    start_odometer: 12000,
  }));
});


test("validateTripComplete rejects negative revenue", () => {
  assert.throws(
    () => validateTripComplete({
      end_odometer: 12345,
      revenue: -1,
    }),
    /Revenue cannot be negative/
  );
});


test("validateDriverStatusUpdate accepts ON_DUTY", () => {
  assert.doesNotThrow(() => validateDriverStatusUpdate("ON_DUTY"));
});


test("validateDriverStatusUpdate rejects invalid status", () => {
  assert.throws(
    () => validateDriverStatusUpdate("ON_TRIP"),
    /Invalid driver status/
  );
});
