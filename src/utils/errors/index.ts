class ErrorWithStatus extends Error {
    constructor(status: number, message: string) {
        super();
        this.message = message;
        this.status = status;
    }

    status: number;
}

export class ObjectNotValidError extends ErrorWithStatus {
    constructor(message: string) {
        super(400, message);
    }
}

export class ObjectNotFoundError extends ErrorWithStatus {
    constructor(message: string) {
        super(404, message);
    }
}

export class ObjectAlreadyExistsError extends ErrorWithStatus {
    constructor(message: string) {
        super(409, message);
    }
}

export class UnauthorizedError extends ErrorWithStatus {
    constructor(message: string) {
        super(401, message);
    }
}

export class InternalServerError extends ErrorWithStatus {
    constructor(message: string) {
        super(500, message);
    }
}