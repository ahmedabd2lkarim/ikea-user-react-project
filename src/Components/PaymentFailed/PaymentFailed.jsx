import React from "react";
import { useNavigate } from "react-router-dom";
const { VITE_API_URL } = import.meta.env;

export default function PaymentFailed() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          padding: "32px",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            backgroundColor: "#fee2e2",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px auto",
          }}
        >
          <span
            style={{
              color: "#dc2626",
              fontSize: "32px",
              fontWeight: "bold",
            }}
          >
            ✕
          </span>
        </div>

        <h2
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#374151",
            marginBottom: "8px",
            margin: "0 0 8px 0",
          }}
        >
          Payment Cancelled
        </h2>

        <p
          style={{
            color: "#6b7280",
            marginBottom: "32px",
            fontSize: "14px",
            lineHeight: "1.5",
          }}
        >
          Your payment was cancelled
        </p>

        <button
          style={{
            width: "100%",
            backgroundColor: "#dc2626",
            color: "white",
            fontWeight: "500",
            padding: "12px 24px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#b91c1c")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#dc2626")}
          onClick={() => navigate("/")}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}
