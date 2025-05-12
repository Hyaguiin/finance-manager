export class ErrorMissingContent extends Error{
    
    constructor(message: string = 'Missing content!'){
        super(message);
        this.name = "Please, the content is required";
    }
}