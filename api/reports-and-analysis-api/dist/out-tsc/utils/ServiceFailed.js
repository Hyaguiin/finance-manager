export class ServiceError extends Error {
    constructor(message = `The Service is Failed`) {
        super(message);
        this.name = `ServiceError`;
    }
}
