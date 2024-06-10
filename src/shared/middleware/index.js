const validateMiddleware = (data) => {
    return (req, res, next) => {
       try {
           const {error, value} = data.validate(req.body, );
           if(error){
             return res.status(400).json({error: error.message});
           }
           req.resalt = value;
           next();
       } catch (err) {
           return res.status(500).json({error: err.message});
       }
    }
}

export default validateMiddleware;