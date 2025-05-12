export class UnknowError extends Error{
    constructor(message: string = "Unknow Error!"){
        super(message);
        this.name = "Please verify the content, Unknow error";
    }
}