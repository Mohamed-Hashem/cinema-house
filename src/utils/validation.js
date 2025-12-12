const NAME_REGEX = /^[a-zA-Z\s]+$/;
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 50;
const MIN_AGE = 18;
const MAX_AGE = 120;

export const validateName = (name, fieldName = "Name") => {
    if (!name || !name.trim()) {
        return fieldName + " is required";
    }
    if (name.trim().length < MIN_NAME_LENGTH) {
        return fieldName + " must be at least " + MIN_NAME_LENGTH + " characters";
    }
    if (name.trim().length > MAX_NAME_LENGTH) {
        return fieldName + " must not exceed " + MAX_NAME_LENGTH + " characters";
    }
    if (!NAME_REGEX.test(name.trim())) {
        return fieldName + " can only contain letters";
    }
    return null;
};

export const validateAge = (age) => {
    const parsedAge = parseInt(age, 10);
    if (!age) {
        return "Age is required";
    }
    if (isNaN(parsedAge)) {
        return "Age must be a valid number";
    }
    if (parsedAge < MIN_AGE) {
        return "You must be at least " + MIN_AGE + " years old";
    }
    if (parsedAge > MAX_AGE) {
        return "Age must not exceed " + MAX_AGE + " years";
    }
    return null;
};

export const validateProfileForm = (formData) => {
    const errors = {};

    const firstNameError = validateName(formData.first_name, "First name");
    if (firstNameError) errors.first_name = firstNameError;

    const lastNameError = validateName(formData.last_name, "Last name");
    if (lastNameError) errors.last_name = lastNameError;

    const ageError = validateAge(formData.age);
    if (ageError) errors.age = ageError;

    return errors;
};
