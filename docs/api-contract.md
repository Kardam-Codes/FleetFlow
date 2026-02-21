# FleetFlow API Contract

## Auth
POST /api/auth/login
POST /api/auth/register

## Vehicles
GET /api/vehicles
POST /api/vehicles
PUT /api/vehicles/:id
DELETE /api/vehicles/:id

## Drivers
GET /api/drivers
POST /api/drivers

## Trips
GET /api/trips
POST /api/trips
PUT /api/trips/:id/dispatch
PUT /api/trips/:id/complete

## Maintenance
POST /api/maintenance

## Fuel Logs
POST /api/fuel

All endpoints protected by JWT.