import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAll, create, update } from "../../../utils/dbUtil";
import { saveCurrentUser } from "../../../utils/users";

const initialProfileData = {
    name: "",
    email: "",
    phone: "",
    website: "",
    address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: {
            lat: "",
            lng: "",
        },
    },
    company: {
        name: "",
        catchPhrase: "",
        bs: "",
    },
};

export const useProfileForm = (mode = "create", initialData = null) => {
    const [profileData, setProfileData] = useState(
        initialData || initialProfileData
    );
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

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
    }, [navigate, mode]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name.includes(".")) {
            // Handle nested object updates (address.street, company.name, etc.)
            const [parent, child] = name.split(".");
            setProfileData((prev) => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value,
                },
            }));
        } else if (name.includes("geo.")) {
            // Handle geo coordinates
            const geoField = name.split(".")[1];
            setProfileData((prev) => ({
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
            setProfileData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }

        // Clear error when user starts typing
        if (error) setError("");
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        if (!profileData.name.trim()) {
            setError("Full name is required.");
            return false;
        }

        if (!profileData.email.trim()) {
            setError("Email is required.");
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

    const generateUserId = async () => {
        try {
            const users = await getAll("users");
            return users.length > 0
                ? Math.max(...users.map((u) => parseInt(u.id))) + 1
                : 1;
        } catch (err) {
            return Date.now(); // Fallback to timestamp
        }
    };

    const trimProfileData = (data) => ({
        ...data,
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim() || "",
        website: data.website.trim() || "",
        address: {
            street: data.address.street.trim() || "",
            suite: data.address.suite.trim() || "",
            city: data.address.city.trim() || "",
            zipcode: data.address.zipcode.trim() || "",
            geo: {
                lat: data.address.geo.lat.trim() || "0",
                lng: data.address.geo.lng.trim() || "0",
            },
        },
        company: {
            name: data.company.name.trim() || "",
            catchPhrase: data.company.catchPhrase.trim() || "",
            bs: data.company.bs.trim() || "",
        },
    });

    const handleCreate = async () => {
        const registrationData = JSON.parse(
            sessionStorage.getItem("registrationData")
        );
        const userId = await generateUserId();

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
        // You might want to update the current user session here too
        navigate("/profile"); // or wherever you want to redirect after edit
    };

    const handleSubmit = async (e, userId = null) => {
        e.preventDefault();

        if (!validateForm()) return;

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
            navigate(-1); // Go back to previous page
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