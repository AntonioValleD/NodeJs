const jwt = require('jsonwebtoken');
const usersController = require('./users.controller');


const userLogin = async (req, res) => {
    if (!req.body || !req.body.userName || !req.body.password){
        // If tere is not login credentials in the request body
        return res.status(400).json({message: 'No login data was provided'});
    }
    // Check login credentials
    try {
        await usersController.checkUserCredentials(req.body.userName, req.body.password);
        let user = await usersController.getUserFromUserName(req.body.userName);
        let tokenData = {userId: user.userId, userName: user.userName, password: user.password};
        const token =jwt.sign(tokenData, 'thisIsSecret');
        return res.status(200).json({token: token});
    } catch (error) {
        // If login credentials are not valid
        console.log(error);
        return res.status(401).json({message: 'Invalid credentials'});
    }
};

const registerUser = async (req, res) => {
    if (!req.body || !req.body.userName || !req.body.password){
        // If tere is not login credentials in the request body
        return res.status(400).json({message: 'No data was provided'});
    }

    try {
        await usersController.addUser(req.body.userName, req.body.password);
        res.status(200).json({message: 'Sing up successfully'});
    } catch (error) {
        return res.status(405).json({message: 'User already exists'});
    }
};


exports.userLogin = userLogin;
exports.registerUser = registerUser;