module.exports = async ({ userRepository}) => {
    userRepository.removeUncheckedAccounts()
}