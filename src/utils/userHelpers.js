import { getAll } from "./dbUtil";

export const checkUsernameExists = async (username) => {
    try {
        const users = await getAll("users");
        return users.some(
            (user) => user.username.toLowerCase() === username.toLowerCase()
        );
    } catch (err) {
        throw new Error("Error checking username availability");
    }
};

export const findUserByCredentials = async (username, password) => {
    try {
        const users = await getAll("users");
        return users.find(
            (user) =>
                user.username === username && user.website === password
        );
    } catch (err) {
        throw new Error("Error validating credentials");
    }
};