export const isNameValid = (name: string): boolean => {
    // Vérifie si la chaîne est vide ou contient uniquement des espaces
    if (!name.trim()) {
        return false;
    }

    // Vérifie le format du nom
    return /^[a-zA-ZÀ-ÿ\s'-]+$/.test(name);
};

export const isEmailValid = (email: string): boolean => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
};

export const areFieldsValid = (
    name: string,
    adresse: string,
    codePostal: string,
    surName: string,
    email: string,
    adult: boolean,
    startDate: string
): boolean => {
    return (
        (name &&
            adresse &&
            codePostal &&
            surName &&
            email &&
            adult &&
            startDate &&
            isNameValid(name) &&
            isNameValid(surName) &&
            isEmailValid(email)) as boolean
    );
};