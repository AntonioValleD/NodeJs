const bcrypt = require('bcrypt');

const hashPasswordSync = (plainPasswd) => {
    return bcrypt.hashSync(plainPasswd, 10);
};

const comparePassword = (plainPasswd, hashPasswd, done) => {
    bcrypt.compare(plainPasswd, hashPasswd, done);
};


exports.hashPasswordSync = hashPasswordSync;
exports.comparePassword = comparePassword;