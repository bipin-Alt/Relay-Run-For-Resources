// Extending the JavaScript Error class to use status codes and my personalized and customized error//

export class AppError extends Error {
    readonly statusCode: number;

    constructor(message:string, statusCode:number){
        super(message);
        this.name = new.target.name;
        this.statusCode = statusCode;
    }
}