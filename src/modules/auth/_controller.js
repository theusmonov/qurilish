import loginServices from "./login.js";
import registerServices from "./register.js";


const PostRegisterUser = async (req, res, next) => {
    try {
        const data = await registerServices(req.body, false);
        return res.status(201).json({message: "User register successfully", data});
    } catch (err) {
        next(err)
    }
}

const PostRegisterAdmin = async (req, res, next) => {
    try {
        const data = await registerServices(req.body, true);
        return res.status(201).json({message: "Admin register successfully", data});
    } catch (err) {
        next(err)
    }
}


const PostLoginUser = async (req, res, next) => {
    try {
        const data = await loginServices(req.body, false);
        res.cookie("refreshToken", data.refresh_token, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000, secure: true});
        return res.status(200).json({message: "User login successfully", data});
    } catch (err) {
        next(err)
    }
}

const PostLoginAdmin = async (req, res, next) => {
    try {
        const data = await loginServices(req.body, true);
        res.cookie("refreshToken", data.refresh_token, {httpOnly: true, maxAge: 30 * 24 * 60 * 60* 1000, secure: true});
        return res.status(200).json({message: "Admin login successfully", data});
    } catch (err) {
        next(err)
    }
}


export {PostRegisterUser, PostRegisterAdmin, PostLoginUser, PostLoginAdmin};