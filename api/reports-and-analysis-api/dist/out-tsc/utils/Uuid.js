export class UUIDNotFoundError extends Error {
    constructor(message = "UUID not found") {
        super(message);
        this.name = "UUIDNotFoundError";
    }
}
