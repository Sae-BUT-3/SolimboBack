const mockArtist = {
    id: "32kWZXLpwGm5Y2B0lKb6Ii",
    name: "Bob Marley",
    images: [{
        height: 640,
        url: "https://i.scdn.co/image/ab67616d0000b273c9adfbd773852e286faed040",
        width: 640
    }],
    external_urls: {spotify: "https://open.spotify.com/artist/32kWZXLpwGm5Y2B0lKb6Ii"},
    popularity: 79,
    genres: ["Reggae", "Roots"]
}
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
const actualDate = new Date()
const rawReview = {
    id_review: 1,
    id_oeuvre: 1,
    countlike: 2,
    countComment: 4,
    description: "C'est top",
    note: 5,
    createdAt: actualDate,
    updatedAt: actualDate,
    type: 'artist',
    utilisateur: mockUser
}
const mockPublicUser = {
    pseudo: "John Doe",
    alias: "John",
    ban_until: null,
    email: "testemail@gmail",
    id_utilisateur: 1,
    id_role: 1,
    photo: null,
    photo_temporaire: null,
    type: "user",
    is_private: false
}
const expectedReview = {
    id_review:1,
    description: "C'est top",
    countlike: 2,
    countComment: 4,
    note: 5,
    createdAt: actualDate,
    doesUserLike: false,
    oeuvre: {
        id: "32kWZXLpwGm5Y2B0lKb6Ii",
        name: "Bob Marley",
        image: "https://i.scdn.co/image/ab67616d0000b273c9adfbd773852e286faed040",
        spotify_url: "https://open.spotify.com/artist/32kWZXLpwGm5Y2B0lKb6Ii",
        popularity: 79,
        genres: ["Reggae", "Roots"],
        type: "artist"
    },
    utilisateur: mockPublicUser,
    type: 'artist',
}


module.exports = {
    rawReview,
    mockArtist,
    expectedReview,
}