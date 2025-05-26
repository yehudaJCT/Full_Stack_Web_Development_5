export const initialProfileData = {
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

export const trimProfileData = (data) => ({
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

export const generateUserId = async (getAll) => {
    try {
        const users = await getAll("users");
        return users.length > 0
            ? Math.max(...users.map((u) => parseInt(u.id))) + 1
            : 1;
    } catch (err) {
        return Date.now(); // Fallback to timestamp
    }
};