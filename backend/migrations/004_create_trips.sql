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