const USER_KEY = 'currentUser';

function saveCurrentUser(user) {
    if (user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
}

function getCurrentUser() {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
}

function removeCurrentUser() {
    localStorage.removeItem(USER_KEY);
}

function isLoggedIn() {
    return getCurrentUser() !== null;
}

export {
    saveCurrentUser,
    getCurrentUser,
    removeCurrentUser,
    isLoggedIn
};