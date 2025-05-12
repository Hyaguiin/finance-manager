export class EmptyArrayError extends Error{
    constructor(message: string = "This Array is Empty"){
        super(message)
            this.name = "EmptyArrayError";
        }
    }
