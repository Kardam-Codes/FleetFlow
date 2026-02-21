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