export class FailedOnCreate extends Error {
    constructor(message = "Failed to create the object") {
        super(message);
        this.name = "Plase, try again";
    }
}
