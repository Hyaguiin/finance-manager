export class JsonErro extends Error {
    constructor(message = "This object is not a json") {
        super(message);
        this.name = "Please insert a json";
    }
}
