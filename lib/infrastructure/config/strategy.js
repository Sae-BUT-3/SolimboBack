module.exports = ({userRepository}) =>{
    return {
        keys: process.env.SECRET_ENCODER, // replace with your secret key for signing and verifying JWTs
        verify: {
            aud: 'urn:audience:test',
            iss: 'urn:issuer:test',
            sub: false,
            nbf: true,
            exp: true,
            maxAgeSec: 14400, // 4 hours
            timeSkewSec: 15
        },
        validate: async (artifacts, request, h) => {
            const {userRepository} = server.app.serviceLocator
            const isValid = !!await userRepository.getByUser(artifacts.decoded.payload.value)
            return {
                isValid,
            };
        },
    }
}