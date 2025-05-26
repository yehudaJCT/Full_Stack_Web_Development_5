export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password, minLength = 6) => {
    return password && password.length >= minLength;
};

export const validateRequired = (value, fieldName) => {
    if (!value || !value.toString().trim()) {
        return `${fieldName} is required.`;
    }
    return null;
};

export const validatePasswordMatch = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        return "Passwords do not match.";
    }
    return null;
};