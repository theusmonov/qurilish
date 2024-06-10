export class BadRequestError extends Error {
    constructor(msg) {
        super(msg);
        if(Error.captureStackTrace) {
            Error.captureStackTrace(this, BadRequestError);
        }
    }
}

export class UnauthorizedError extends Error {
    constructor(msg) {
        super(msg);
        if(Error.captureStackTrace) {
            Error.captureStackTrace(this, UnauthorizedError);
        }
    }
}

export class NotFoundError extends Error {
    constructor(msg) {
        super(msg);
        if(Error.captureStackTrace) {
            Error.captureStackTrace(this, NotFoundError);
        }
    }
}