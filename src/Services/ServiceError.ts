export class ServiceError extends Error {

    public status: number;

    constructor(status: number, message?: string) {
        super(message)

        this.name = "FailedServiceAction";
        this.status = status;
    }
}
