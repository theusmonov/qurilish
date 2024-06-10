import { BadRequestError, NotFoundError, UnauthorizedError } from "./classes.js";



const mapErrToStatus = (err, req, res, next) => {
    let status = 500;
    if(err instanceof BadRequestError) status = 400;
    else if(err instanceof UnauthorizedError) status = 401;
    else if(err instanceof NotFoundError) status = 404;

    res.status(status).json({error: err.message});
    
};

export default mapErrToStatus ;

