import React, { useEffect, useState } from "react";
import DataTable from "../components/common/DataTable";
import StatusPill from "../components/common/StatusPill";
import { getVehicles } from "../api/vehicle.api"; // assuming this exists
import PageHeader from "../components/common/PageHeader";

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            const response = await getVehicles();
            setVehicles(response.data);
        } catch (error) {
            console.error("Error fetching vehicles:", error);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { key: "name", label: "Vehicle Name" },
        { key: "license_plate", label: "License Plate" },
        { key: "capacity", label: "Capacity (kg)" },
        {
            key: "status",
            label: "Status",
            render: (value) => <StatusPill status={value} />,
        },
    ];

    const renderActions = (row) => {
        return (
            <button
                onClick={() => alert(`Edit vehicle ${row.id}`)}
                style={{ padding: "6px 10px" }}
            >
                Edit
            </button>
        );
    };

    return (
        <div>
            <PageHeader
                title="Vehicle Registry"
                subtitle="Manage fleet assets and availability"
                actions={
                    <button
                        style={{
                            padding: "10px 16px",
                            background: theme.colors.accent,
                            border: "none",
                            borderRadius: "8px",
                            color: "#fff",
                            cursor: "pointer",
                            fontWeight: 500,
                        }}
                    >
                        Add Vehicle
                    </button>
                }
            />

            <DataTable
                columns={columns}
                data={vehicles}
                loading={loading}
                renderActions={renderActions}
            />
        </div>
    );
};

export default Vehicles;