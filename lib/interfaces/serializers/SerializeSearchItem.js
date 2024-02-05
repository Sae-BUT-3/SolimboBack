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
            subtitle: item?.artists[0].name
        }
    },
    'track': (item) => {
        return {
            imageURL: item.album.images[0]?.url,
            title: item.name,
            subtitle: item?.artists[0].name
        }
    },
    'single': (item) => {
        return {
            imageURL: item.images[0]?.url,
            title: item.name,
            subtitle: item?.artists[0].name
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
    const value = seralizer[item.type](item)
    value.type = item.type
    return value
}