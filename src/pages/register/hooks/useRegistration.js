import { useState } from "react";
import { getAll } from "../../../utils/dbUtil";
import { useNavigate } from "react-router-dom";

export const useRegistration = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user starts typing
        if (error) setError("");
    };

    const validateForm = () => {
        if (!formData.username.trim()) {
            setError("Username is required.");
            return false;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return false;
        }

        return true;
    };

    const checkUsernameExists = async (username) => {
        try {
            const users = await getAll("users");
            return users.some(
                (user) => user.username.toLowerCase() === username.toLowerCase()
            );
        } catch (err) {
            throw new Error("Error checking username availability");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        setError("");

        try {
            const usernameExists = await checkUsernameExists(formData.username);

            if (usernameExists) {
                setError("Username already exists. Please choose another one.");
                return;
            }

            // Store basic registration data for the next step
            sessionStorage.setItem(
                "registrationData",
                JSON.stringify({
                    username: formData.username.trim(),
                    password: formData.password,
                })
            );

            // Navigate to complete profile page
            navigate("/complete-profile");
        } catch (err) {
            setError(err.message || "Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleNavigateToLogin = () => {
        navigate("/login");
    };

    return {
        formData,
        error,
        isLoading,
        handleInputChange,
        handleSubmit,
        handleNavigateToLogin,
    };
};