const seralizer = {
    'artist': (item) => {
        return {
            imageURL: item.images[0]?.url,
            title: item.name,
            subtitle: ''
        }

    },
    'album': (item) => {
        return {
            imageURL: item.images[0]?.url,
            title: item.name,
            subtitle: ''
        }
    },
    'track': (item) => {
        return {
            imageURL: item.album.images[0]?.url,
            title: item.name,
            subtitle: ''
        }
    },
    'user': (item) => {
        return {
            imageURL: item.photo,
            title: item.alias,
            subtitle: item.pseudo
        }
    }
}
module.exports = (item) => {
    return seralizer[item.type](item)
}