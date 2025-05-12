export class UUIDNotFoundError extends Error {
    constructor(message: string = "UUID not found") {
        super(message);
        this.name = "UUIDNotFoundError"; 
    }
}
