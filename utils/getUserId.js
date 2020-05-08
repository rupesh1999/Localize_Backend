import  jwt  from 'jsonwebtoken';
import keys from '../constants/keys';

const getUserId = (request) => {
    const header = request.request.headers.authorization;
    if(!header){
        throw new Error("Authentication Required");
    }
    const token = header.replace("Bearer " , "");

    const decoded  = jwt.verify(token , keys.secretOrKey);
    return decoded.id;
}

export default getUserId;