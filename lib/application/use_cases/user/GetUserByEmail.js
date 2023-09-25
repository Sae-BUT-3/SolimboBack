'use strict';

module.exports = (email, { userRepository }) => {
    return userRepository.getByEmail(email);
};
