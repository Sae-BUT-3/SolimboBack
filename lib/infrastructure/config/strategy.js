module.exports = ({userRepository}) =>{
    return {
        keys: process.env.SECRET_ENCODER, // replace with your secret key for signing and verifying JWTs
        verify: {
            aud: 'urn:audience:test',
            iss: 'urn:issuer:test',
            sub: false,
            nbf: true,
            timeSkewSec: 15
        },
        validate: async (artifacts, request, h) => {
            const isValid = !!await userRepository.getByUser(artifacts.decoded.payload.value)
            return {
                isValid,
            };
        },
    }
}