import { useNavigate } from "react-router-dom";
import { useForm } from "./useForm";
import {
    validateRequired,
    validatePassword,
    validatePasswordMatch,
    validateEmail
} from "../utils/validation";
import {
    checkUsernameExists,
    findUserByCredentials
} from "../utils/userHelpers";
import { saveCurrentUser } from "../utils/users";

export const useLogin = () => {
    const navigate = useNavigate();
    const { formData, error, setError, isLoading, setIsLoading, handleInputChange } = useForm({
        username: "",
        password: "",
    });

    const validateLoginForm = () => {
        const usernameError = validateRequired(formData.username, "Username");
        if (usernameError) {
            setError(usernameError);
            return false;
        }

        const passwordError = validateRequired(formData.password, "Password");
        if (passwordError) {
            setError(passwordError);
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateLoginForm()) return;

        setIsLoading(true);
        setError("");

        try {
            const matchedUser = await findUserByCredentials(
                formData.username,
                formData.password
            );

            if (!matchedUser) {
                setError("Invalid username or password.");
                return;
            }

            saveCurrentUser({
                userId: matchedUser.id,
                name: matchedUser.name,
                username: matchedUser.username,
            });

            navigate("/home");
        } catch (err) {
            setError(err.message || "Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        error,
        isLoading,
        handleInputChange,
        handleSubmit,
        navigateToRegister: () => navigate("/register"),
    };
};

export const useRegistration = () => {
    const navigate = useNavigate();
    const { formData, error, setError, isLoading, setIsLoading, handleInputChange } = useForm({
        username: "",
        password: "",
        confirmPassword: "",
    });

    const validateRegistrationForm = () => {
        const usernameError = validateRequired(formData.username, "Username");
        if (usernameError) {
            setError(usernameError);
            return false;
        }

        if (!validatePassword(formData.password, 6)) {
            setError("Password must be at least 6 characters long.");
            return false;
        }

        const passwordMatchError = validatePasswordMatch(
            formData.password,
            formData.confirmPassword
        );
        if (passwordMatchError) {
            setError(passwordMatchError);
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateRegistrationForm()) return;

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

            navigate("/complete-profile");
        } catch (err) {
            setError(err.message || "Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        error,
        isLoading,
        handleInputChange,
        handleSubmit,
        navigateToLogin: () => navigate("/login"),
    };
};