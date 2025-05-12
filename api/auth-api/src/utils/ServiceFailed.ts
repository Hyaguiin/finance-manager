export class ServiceError extends Error{
    constructor(message: string = `The Service is Failed`){
        super(message);
        this.name = `ServiceError`;
    }
}