export class FailedToDelete extends Error {
    constructor(message: string = "Failed to Delete!!"){
        super(message);
        this.name = "FailedToDelete";
    }
}