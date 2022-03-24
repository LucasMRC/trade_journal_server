class ErrorWithStatus extends Error {
    constructor(message: string, status: number) {
        super();
        this.message = message;
        this.status = status;
    }

    status: number;
}

export default ErrorWithStatus;