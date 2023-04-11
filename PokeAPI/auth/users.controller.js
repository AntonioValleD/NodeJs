const uuid = require('uuid');
const crypto = require('../tools/crypto');
const teamsController = require('../teams/teams.controller');

// Models
const UserModel = require('../connect.db').UserModel;

const getUserFromUserName = (userName) => {
    return new Promise(async (resolve, reject) => {
        let user = await UserModel.findOne({userName: userName}).exec();
        resolve(user);
    });
};

const addUser = (userName, password) => {
    return new Promise(async (resolve, reject) => {
        let checkUser = await UserModel.findOne({userName: userName}).exec();
        if (checkUser){
            reject();
        } else {
            let userId = uuid.v1();
            let newUser = new UserModel({
                userId: userId,
                userName: userName,
                password: crypto.hashPasswordSync(password)
            });
            await newUser.save().then(() => console.log('User saved'));
            await teamsController.bootstrapTeam(userId);
            resolve();
        }
    });
};

const cleanUpUsers = () => {
    return new Promise(async (resolve, reject) => {
        await UserModel.deleteMany({}).exec();
        resolve();
    });
};

const checkUserCredentials = (userName, password) => {
    return new Promise(async (resolve, reject) => {
        let user = await getUserFromUserName(userName);
        if (user){
            crypto.comparePassword(password, user.password, (err, result) => {
                if (err){
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        } else {
            reject('Missing user');
        }
    });
};

const checkUserToken = (userToken) => {
    return new Promise(async (resolve, reject) => {
        let user = await getUserFromUserName(userToken.userName);
        if (!user){
            return reject(); 
        } else if (user.password != userToken.password){
            return reject();
        } else {
            return resolve();
        }
    });
};

exports.addUser = addUser;
exports.getUserFromUserName = getUserFromUserName;
exports.checkUserCredentials = checkUserCredentials;
exports.checkUserToken = checkUserToken;
exports.cleanUpUsers = cleanUpUsers;