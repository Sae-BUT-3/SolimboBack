const spotifyScopes = [
    'user-read-private',
    'user-read-email',
    'user-library-read',
    'playlist-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-modify-private',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'user-follow-read',
    'user-follow-modify',
    'user-library-read',
    'user-library-modify',
    'user-top-read',
    'user-read-recently-played',
    'ugc-image-upload'
];
module.exports = () => {
    return encodeURI(`https://accounts.spotify.com/authorize?client_id=${process.env.CLIENT_ID}&response_type=${'code'}&redirect_uri=${encodeURI(process.env.SPOTIFY_AUTH_REDIRECT)}&show_dialog=${'true'}&scope=${spotifyScopes.join(' ')}`)
}