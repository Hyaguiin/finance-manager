export class FailedOnCreate extends Error{
    constructor(message: string = "Failed to create the object"){
        super(message);
        this.name = "Plase, try again";
    }
}