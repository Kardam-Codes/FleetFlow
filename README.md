
---

# 🚚 FleetFlow

### Modular Fleet & Logistics Management System

FleetFlow is a **rule-driven digital control tower** designed to replace inefficient manual fleet logbooks with a centralized, intelligent logistics management platform.

It optimizes:

* 🚛 Vehicle lifecycle management
* 👨‍✈️ Driver compliance & safety
* 📦 Trip dispatch workflows
* 💰 Fuel, maintenance & financial performance
* 📊 Operational analytics & ROI insights

---

# 🎯 Objective

To replace fragmented, manual coordination (logbooks, spreadsheets, WhatsApp) with a **centralized, role-based digital hub** that:

* Enforces business rules
* Prevents illegal dispatch operations
* Tracks asset lifecycle in real-time
* Monitors compliance & safety
* Enables data-driven financial decisions

---

# 👥 Target Users

| Role                   | Responsibility                                          |
| ---------------------- | ------------------------------------------------------- |
| **Fleet Managers**     | Asset lifecycle, vehicle health, maintenance scheduling |
| **Dispatchers**        | Trip creation, driver assignment, cargo validation      |
| **Safety Officers**    | License compliance, driver status monitoring            |
| **Financial Analysts** | ROI analysis, fuel audits, operational cost tracking    |

---

# 🏗 System Architecture

```
Frontend (React + Recharts)
        ↓
Backend (Node.js + Express)
        ↓
PostgreSQL (Relational Database)
```

### Architectural Principles

* State-machine-driven workflow
* Role-Based Access Control (RBAC)
* Business rule validation
* Real-time status transitions
* Relational financial tracking
* Modular, scalable frontend

---

# 🔐 Authentication & RBAC

FleetFlow implements:

* JWT-based authentication
* Persistent login
* Role-based route protection
* Dynamic landing based on user role

Example:

| Role              | Default Landing |
| ----------------- | --------------- |
| Fleet Manager     | `/dashboard`    |
| Dispatcher        | `/trips`        |
| Safety Officer    | `/drivers`      |
| Financial Analyst | `/analytics`    |

---

# 📄 Core System Pages

---

## 1️⃣ Login & Authentication

* Secure email/password login
* RBAC enforcement
* Protected routes
* Role-based landing

---

## 2️⃣ Command Center (Dashboard)

High-level KPI view:

* Active Fleet (On Trip)
* Maintenance Alerts (In Shop)
* Utilization Rate
* Pending Cargo

Includes filtering by:

* Vehicle Type
* Status
* Region

---

## 3️⃣ Vehicle Registry (Asset Management)

CRUD operations for vehicles.

Data:

* License Plate (Unique)
* Max Capacity
* Odometer
* Acquisition Cost

Status:

* Available
* On Trip
* In Shop
* Retired

---

## 4️⃣ Trip Dispatcher

Core workflow engine.

### Business Rules Enforced

* Prevent dispatch if cargo exceeds capacity
* Prevent assignment if driver license expired
* Prevent assignment if vehicle not available

Trip Lifecycle:

```
Draft → Dispatched → Completed → Cancelled
```

Automatic state transitions:

* Vehicle → On Trip
* Driver → On Trip

---

## 5️⃣ Maintenance & Service Logs

Adding a service record:

* Automatically changes vehicle status to "In Shop"
* Removes vehicle from dispatch pool

Prevents operational conflicts.

---

## 6️⃣ Completed Trip & Expense Logging

Tracks:

* Fuel usage
* Maintenance cost
* Revenue per trip

Automatically calculates:

```
Total Operational Cost = Fuel + Maintenance
```

---

## 7️⃣ Driver Performance & Compliance

* License expiry validation
* Status toggle (On Duty / Suspended / Off Duty)
* Safety scoring
* Trip completion metrics

Drivers with expired licenses cannot be assigned.

---

## 8️⃣ Operational Analytics

Powered by Recharts.

Includes:

* 📈 Fuel Efficiency (km/L)
* 📊 Vehicle ROI
* 📉 Cost per KM
* 📦 Fleet Utilization (Donut chart)

Formula:

```
ROI = (Revenue - (Maintenance + Fuel)) / Acquisition Cost
```

Exports:

* CSV
* PDF (planned)

---

# 🔄 System Workflow Example

1. Add Vehicle: `Van-05` (500kg) → Status: Available
2. Add Driver: Alex → License validated
3. Dispatch Trip: 450kg

   * 450 < 500 → Pass
   * Vehicle & Driver → On Trip
4. Complete Trip → Enter odometer

   * Vehicle & Driver → Available
5. Log Maintenance → Oil Change

   * Vehicle → In Shop
6. Analytics auto-updates cost-per-km

---

# 🧠 Core Concepts Implemented

* State Machine Architecture
* Real-time state transitions
* Business rule validation
* RBAC enforcement
* Relational database modeling
* Derived financial metrics
* Modular frontend structure

---

# 🗂 Project Structure

```
frontend/
  ├── api/
  ├── components/
  │     ├── forms/
  │     ├── charts/
  ├── pages/
  ├── routes/
  ├── context/

backend/
  ├── models/
  ├── services/
  ├── controllers/
  ├── routes/
  ├── middlewares/
  ├── migrations/
```

---

# 🚀 Tech Stack

## Frontend

* React
* React Router
* Recharts
* Context API

## Backend

* Node.js
* Express
* JWT Authentication
* RESTful API

## Database

* PostgreSQL
* Relational schema
* Foreign key constraints

---

# 📊 Key Business Metrics Tracked

| Metric           | Purpose                 |
| ---------------- | ----------------------- |
| Utilization Rate | Operational efficiency  |
| Fuel Efficiency  | Cost optimization       |
| Cost per KM      | Profitability insight   |
| ROI              | Asset investment return |

---

# 🔥 What Makes FleetFlow Strong

✔ Not just CRUD
✔ State-machine driven
✔ Rule-enforced dispatch
✔ Financial intelligence
✔ Compliance-aware
✔ Enterprise-style architecture
✔ Hackathon production quality

---

# 🛠 Setup Instructions

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Kardam-Codes/FleetFlow.git
cd FleetFlow
```

---

## 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env`:

```
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret
```

Run:

```bash
npm run dev
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Create `.env`:

```
VITE_API_URL=http://localhost:5000/api
```

Run:

```bash
npm run dev
```

---

# 🎥 Demo Flow

1. Login as Dispatcher
2. Add Vehicle
3. Add Driver
4. Dispatch Trip
5. Complete Trip
6. Log Fuel
7. View Analytics Dashboard

Highlight:

* State transitions
* Validation rules
* Role-based access
* Financial metrics updating live

---

# 📈 Future Improvements

* Real-time WebSocket updates
* Predictive maintenance alerts
* Route optimization engine
* Driver telematics integration
* Automated report scheduling

---

# 🧩 One-Line Summary

FleetFlow is a **state-machine-driven fleet intelligence system** that enforces compliance, optimizes dispatch, and transforms operational data into financial insights.

---
