import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "./useForm";
import { getAll, create, update } from "../utils/dbUtil";
import { saveCurrentUser, getCurrentUser } from "../utils/users";
import {
    validateRequired,
    validateEmail
} from "../utils/validation";
import {
    initialProfileData,
    trimProfileData,
    generateUserId
} from "../utils/profileHelpers";

export const useProfileForm = (mode = "create", initialData = null) => {
    const navigate = useNavigate();
    const {
        formData: profileData,
        setFormData: setProfileData,
        error,
        setError,
        isLoading,
        setIsLoading,
        handleInputChange
    } = useForm(initialData || initialProfileData);

    useEffect(() => {
        if (mode === "create") {
            // Check if user came from registration
            const registrationData = sessionStorage.getItem("registrationData");
            if (!registrationData) {
                navigate("/register");
                return;
            }
            const regObj = JSON.parse(registrationData);
            setProfileData((prev) => ({
                ...prev,
                website: regObj.password || "",
            }));
        }
    }, [navigate, mode, setProfileData]);

    const validateProfileForm = () => {
        const nameError = validateRequired(profileData.name, "Full name");
        if (nameError) {
            setError(nameError);
            return false;
        }

        const emailError = validateRequired(profileData.email, "Email");
        if (emailError) {
            setError(emailError);
            return false;
        }

        if (!validateEmail(profileData.email)) {
            setError("Please enter a valid email address.");
            return false;
        }

        if (mode === "create" && !profileData.website.trim()) {
            setError("Website is required. (Password Purpose)");
            return false;
        }

        return true;
    };

    const handleCreate = async () => {
        const registrationData = JSON.parse(
            sessionStorage.getItem("registrationData")
        );
        const userId = await generateUserId(getAll);

        const completeUser = {
            id: userId.toString(),
            username: registrationData.username,
            ...trimProfileData(profileData),
        };

        // Save user to database
        await create("users", completeUser);

        // Clear registration data
        sessionStorage.removeItem("registrationData");

        saveCurrentUser({
            userId: completeUser.id,
            name: completeUser.name,
            username: completeUser.username,
        });

        navigate("/home");
    };

    const handleUpdate = async (userId) => {
        const updatedUser = {
            id: userId,
            ...trimProfileData(profileData),
        };

        await update("users", userId, updatedUser);
        navigate("/profile");
    };

    const handleSubmit = async (e, userId = null) => {
        e.preventDefault();

        if (!validateProfileForm()) return;

        setIsLoading(true);
        setError("");

        try {
            if (mode === "create") {
                await handleCreate();
            } else {
                await handleUpdate(userId);
            }
        } catch (err) {
            const errorMessage =
                mode === "create"
                    ? "Failed to complete registration. Please try again."
                    : "Failed to update profile. Please try again.";
            setError(errorMessage);
            console.error("Profile operation error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        if (mode === "create") {
            navigate("/register");
        } else {
            navigate(-1);
        }
    };

    return {
        profileData,
        error,
        isLoading,
        handleInputChange,
        handleSubmit,
        handleBack,
        setProfileData,
        setError,
    };
};

export const useProfileEdit = () => {
    const navigate = useNavigate();
    const {
        formData: profileData,
        setFormData: setProfileData,
        error,
        setError,
        isLoading,
        setIsLoading,
        handleInputChange
    } = useForm(initialProfileData);

    const validateProfileForm = () => {
        const nameError = validateRequired(profileData.name, "Full name");
        if (nameError) {
            setError(nameError);
            return false;
        }

        const emailError = validateRequired(profileData.email, "Email");
        if (emailError) {
            setError(emailError);
            return false;
        }

        if (!validateEmail(profileData.email)) {
            setError("Please enter a valid email address.");
            return false;
        }

        return true;
    };

    const handleUpdate = async (userId) => {
        const updatedUser = {
            id: userId,
            ...trimProfileData(profileData),
        };

        await update("users", userId, updatedUser);

        // Update current user session with new name
        const currentUser = getCurrentUser();
        if (currentUser) {
            saveCurrentUser({
                ...currentUser,
                name: updatedUser.name,
            });
        }

        navigate("/profile");
    };

    const handleSubmit = async (e, userId) => {
        e.preventDefault();

        if (!validateProfileForm()) return;

        setIsLoading(true);
        setError("");

        try {
            await handleUpdate(userId);
        } catch (err) {
            setError("Failed to update profile. Please try again.");
            console.error("Profile update error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        navigate("/profile");
    };

    return {
        profileData,
        error,
        isLoading,
        handleInputChange,
        handleSubmit,
        handleBack,
        setProfileData,
        setError,
    };
};