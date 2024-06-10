import { Users } from "../../models/users.js";
import {UnauthorizedError} from "../../shared/errors/classes.js";
import {bcryptHash, jwtRefreshToken, jwtSignToken} from "../../utils/helper.js";


const loginServices = async (data, isAdmin = false) => {
    const {email, password} = data;

    const user = await Users.findOne({
        where: {email},
    });

    if (!user) {
        throw new UnauthorizedError("Invalid email or password");
    }

    const passwordCheck = bcryptHash.compare(password, user.password);

    if (!passwordCheck) {
        throw new UnauthorizedError("Invalid email or password");
    }

    const role = isAdmin ? "admin" : "user";
    const access_token = jwtSignToken.sign({email, password, role});
    const refresh_token = jwtRefreshToken({email, password, role});

    return {access_token, refresh_token, user_id: user.id};

}

export default loginServices;