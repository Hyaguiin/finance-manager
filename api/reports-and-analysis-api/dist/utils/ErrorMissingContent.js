export class ErrorMissingContent extends Error {
    constructor(message = 'Missing content!') {
        super(message);
        this.name = "Please, the content is required";
    }
}
