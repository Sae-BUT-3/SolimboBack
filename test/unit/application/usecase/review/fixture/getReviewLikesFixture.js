const mockUser = {
    id_utilisateur: 1,
    pseudo: "John Doe",
    alias: "John",
    ban_until: null,
    email: "testemail@gmail",
    id_role: 1,
    photo: null,
    photo_temporaire: null,
    type: "user",
    is_private: false
    
}
const mockPublicUser = {
    pseudo: "John Doe",
    alias: "John",
    ban_until: null,
    id_utilisateur: 1,
    email: "testemail@gmail",
    id_role: 1,
    photo: null,
    photo_temporaire: null,
    type: "user",
    is_private: false
}
module.exports = {
    mockUser,
    mockPublicUser
}