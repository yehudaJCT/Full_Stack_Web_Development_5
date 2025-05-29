import React from 'react';

const InfoItem = ({ label, value, isLink = false }) => (
    <div className="mb-2">
        <small className="text-muted d-block" style={{ fontSize: "12px", fontWeight: "600" }}>
            {label}
        </small>
        {isLink ? (
            <a
                href={value.startsWith("http") ? value : `http://${value}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
                style={{ color: "#667eea", fontWeight: "500" }}
            >
                {value}
            </a>
        ) : (
            <span className="text-dark" style={{ fontWeight: "500" }}>
                {value || "Not provided"}
            </span>
        )}
    </div>
);

export default InfoItem;