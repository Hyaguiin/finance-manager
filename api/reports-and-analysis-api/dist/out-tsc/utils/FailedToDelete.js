export class FailedToDelete extends Error {
    constructor(message = "Failed to Delete!!") {
        super(message);
        this.name = "FailedToDelete";
    }
}
