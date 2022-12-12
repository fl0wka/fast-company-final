export function generateAuthError(message) {
    const errorMessage = "Email или пароль введенны неверно";
    switch (message) {
        case "INVALID_PASSWORD":
            return errorMessage;
        case "EMAIL_NOT_FOUND":
            return errorMessage;
        case "EMAIL_EXISTS":
            return "Пользователь с таким email уже существует";
        default:
            return "Слишком много попыток входа. Попробуйте позже";
    }
}
