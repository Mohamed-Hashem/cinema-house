const NAME_REGEX = /^[a-zA-Z\s]+$/;
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 50;
const MIN_AGE = 18;
const MAX_AGE = 120;

const validateName = (name, fieldName = "Name") => {
  const trimmed = name?.trim?.();
  if (!trimmed) return `${fieldName} is required`;
  if (trimmed.length < MIN_NAME_LENGTH)
    return `${fieldName} must be at least ${MIN_NAME_LENGTH} characters`;
  if (trimmed.length > MAX_NAME_LENGTH)
    return `${fieldName} must not exceed ${MAX_NAME_LENGTH} characters`;
  if (!NAME_REGEX.test(trimmed)) return `${fieldName} can only contain letters`;
  return null;
};

const validateAge = (age) => {
  const parsedAge = parseInt(age, 10);
  if (isNaN(parsedAge)) return "Age must be a valid number";
  if (parsedAge < MIN_AGE) return `You must be at least ${MIN_AGE} years old`;
  if (parsedAge > MAX_AGE) return `Age must not exceed ${MAX_AGE} years`;
  return null;
};

const validateProfileUpdate = ({ first_name, last_name, age }) =>
  [
    validateName(first_name, "First name"),
    validateName(last_name, "Last name"),
    validateAge(age),
  ].filter(Boolean);

module.exports = { validateName, validateAge, validateProfileUpdate };
