import { useState } from "react";

export const useForm = (initialData = {}) => {
    const [formData, setFormData] = useState(initialData);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name.includes(".")) {
            // Handle nested object updates (address.street, company.name, etc.)
            const [parent, child] = name.split(".");
            setFormData((prev) => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value,
                },
            }));
        } else if (name.includes("geo.")) {
            // Handle geo coordinates
            const geoField = name.split(".")[1];
            setFormData((prev) => ({
                ...prev,
                address: {
                    ...prev.address,
                    geo: {
                        ...prev.address.geo,
                        [geoField]: value,
                    },
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }

        // Clear error when user starts typing
        if (error) setError("");
    };

    const resetForm = (newData = initialData) => {
        setFormData(newData);
        setError("");
        setIsLoading(false);
    };

    return {
        formData,
        setFormData,
        error,
        setError,
        isLoading,
        setIsLoading,
        handleInputChange,
        resetForm,
    };
};