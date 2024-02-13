'use strict';

const User = require('../../../domain/model/User');
const bcrypt = require("bcrypt");
const rolesEnum = require('../../../domain/model/utils/RolesEnum')
const throwStatusCode = require("../utils/throwStatusCode")
const crypto = require("crypto");
module.exports = async (password,resetToken,{userRepository}) => {
    const user = await userRepository.getByResetToken(resetToken)
    if(!user) {
        throwStatusCode(400,'Token invalide')
    }
    password = await bcrypt.hash(password,10)
    if(!password) {
        throwStatusCode('500','Internal server error')
    }
    user.reset_token = null
    user.password = password
    await userRepository.updateUser(user)
    return user
};
