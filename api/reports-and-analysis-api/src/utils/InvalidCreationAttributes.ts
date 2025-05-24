export class InvalidCredentialsError extends Error{
    constructor(message: string = "Please, this creadentials are invalid"){
        super(message)
            this.name = "InvalidCredentialsError";
        }
    }
