export class EmptyArrayError extends Error {
    constructor(message = "This Array is Empty") {
        super(message);
        this.name = "EmptyArrayError";
    }
}
