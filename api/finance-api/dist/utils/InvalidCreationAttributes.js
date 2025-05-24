export class InvalidCredentialsError extends Error {
    constructor(message = "Please, this creadentials are invalid") {
        super(message);
        this.name = "InvalidCredentialsError";
    }
}
