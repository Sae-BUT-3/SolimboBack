module.exports = async ({ userRepository}) => {
    userRepository.removeUncheckedAccounts()
    userRepository.clearResetTokens()
}