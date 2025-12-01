import React from "react";

export function PropertyPopup({ property }: { property: any }) {

    return (
        <div
            style={{
                width: "260px",
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                overflow: "hidden",
                position: "absolute",
                transform: "translate(-50%, -100%)",
                zIndex: 999,
            }}
        >
            {/* IMAGE */}
            <div style={{ position: "relative", width: "100%", height: "150px" }}>
                <img
                    src={property.image}
                    alt={property.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                {/* Heart */}
                <div
                    style={{
                        position: "absolute",
                        top: "12px", // Increased distance from top
                        right: "12px", // Increased distance from right
                        background: "transparent", // White background, slightly transparent
                        border: "15px solid rgba(0, 0, 0, 0.1)", // Subtle gray border for definition
                        borderRadius: "50%",
                        width: "30px", // Explicit width and height for perfect circle
                        height: "30px", // Explicit width and height for perfect circle
                        display: "flex", // Use flexbox to perfectly center the heart
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        fontSize: "20px", // Slightly larger heart
                        transition: "transform 0.2s, background 0.2s", // Smooth transition for hover effect
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)", //
                    }}
                >
                    🤍
                </div>
            </div>

            {/* CONTENT */}
            <div style={{ padding: "10px" }}>
                <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 700 }}>
                    ₹{property.price.toLocaleString("en-IN")}
                </h3>
                <p style={{ fontSize: "14px", margin: "4px 0", color: "#555" }}>
                    {property.configuration} · {property.propertyType}
                </p>
                <p style={{ fontSize: "13px", margin: 0, color: "#777" }}>
                    {property.micromarket}, Bangalore
                </p>
            </div>
        </div>
    );
}
