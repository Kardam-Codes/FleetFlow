import os
from pathlib import Path

# Root directory (where script is executed)
ROOT = Path.cwd()

# -----------------------------
# Helper Functions
# -----------------------------

def create_directory(path: Path):
    path.mkdir(parents=True, exist_ok=True)
    print(f"✅ Created directory: {path}")


def create_file(path: Path, content: str):
    if path.exists():
        print(f"⚠️ Skipped (already exists): {path}")
        return
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip())
    print(f"✅ Created file: {path}")


# -----------------------------
# SQL FILE CONTENTS
# -----------------------------

sql_files = {
    "001_create_users.sql": """
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
""",

    "002_create_vehicles.sql": """
CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    license_plate VARCHAR(50) UNIQUE NOT NULL,
    max_capacity INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'AVAILABLE',
    odometer INTEGER DEFAULT 0,
    acquisition_cost NUMERIC(12,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
""",

    "003_create_drivers.sql": """
CREATE TABLE drivers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    license_number VARCHAR(100) UNIQUE NOT NULL,
    license_expiry DATE NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'ON_DUTY',
    safety_score FLOAT DEFAULT 100,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
""",

    "004_create_trips.sql": """
CREATE TABLE trips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vehicle_id UUID REFERENCES vehicles(id),
    driver_id UUID REFERENCES drivers(id),
    cargo_weight INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'DRAFT',
    start_odometer INTEGER,
    end_odometer INTEGER,
    revenue NUMERIC(12,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
""",

    "005_create_maintenance.sql": """
CREATE TABLE maintenance_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vehicle_id UUID REFERENCES vehicles(id),
    description TEXT,
    cost NUMERIC(12,2),
    service_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
""",

    "006_create_fuel_logs.sql": """
CREATE TABLE fuel_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trip_id UUID REFERENCES trips(id),
    liters NUMERIC(10,2) NOT NULL,
    cost NUMERIC(12,2) NOT NULL,
    fuel_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
"""
}

# -----------------------------
# DOC FILE CONTENTS
# -----------------------------

doc_files = {
    "architecture.md": """
# FleetFlow Architecture

## High-Level Architecture

Frontend (React)
    ↓
Backend (Node + Express REST API)
    ↓
PostgreSQL Database

## Backend Layers

- Routes → Define endpoints
- Controllers → Handle request/response
- Services → Business logic & state transitions
- Models → Database interaction
- Middleware → Auth, RBAC, error handling

## Core Concepts

- State Machine Driven
- Role-Based Access Control
- Business Rule Validation
- Derived Financial Metrics
""",

    "state-machine.md": """
# FleetFlow State Machine

## Vehicle States
AVAILABLE → ON_TRIP
AVAILABLE → IN_SHOP
ON_TRIP → AVAILABLE
IN_SHOP → AVAILABLE
AVAILABLE → RETIRED

## Driver States
ON_DUTY → ON_TRIP
ON_TRIP → ON_DUTY
ON_DUTY → SUSPENDED

## Trip States
DRAFT → DISPATCHED
DISPATCHED → COMPLETED
DISPATCHED → CANCELLED

All transitions are validated in the Service Layer.
""",

    "api-contract.md": """
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
""",

    "demo-script.md": """
# FleetFlow Demo Script

1. Login as Dispatcher
2. Create Vehicle
3. Create Driver
4. Dispatch Trip
5. Complete Trip
6. Add Fuel Log
7. Add Maintenance Log
8. Show Analytics Dashboard

Highlight:
- State transitions
- Validation rules
- Role-based access
- ROI & fuel efficiency metrics
"""
}

# -----------------------------
# MAIN EXECUTION
# -----------------------------

def main():
    print("🚀 Setting up FleetFlow migrations and docs...")

    # Create migrations directory
    migrations_path = ROOT / "backend" / "migrations"
    create_directory(migrations_path)

    # Create SQL files
    for filename, content in sql_files.items():
        create_file(migrations_path / filename, content)

    # Create docs directory
    docs_path = ROOT / "docs"
    create_directory(docs_path)

    # Create documentation files
    for filename, content in doc_files.items():
        create_file(docs_path / filename, content)

    print("\n🎉 Setup complete!")


if __name__ == "__main__":
    main()