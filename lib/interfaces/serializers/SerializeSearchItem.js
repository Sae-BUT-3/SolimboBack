const seralizer = {
    'artist': (item) => {
        return {
            id:  item.id,
            imageURL: item.image,
            title: item.name,
            subtitle: ''
        }

    },
    'album': (item) => {
        return {
            id:  item.id,
            imageURL: item.image,
            title: item.name,
            subtitle: item?.artists[0].name
        }
    },
    'track': (item) => {
        return {
            id:  item.id,
            imageURL: item.album.image,
            title: item.name,
            subtitle: item?.artists[0].name
        }
    },
    'single': (item) => {
        return {
            id:  item.id,
           
            imageURL: item.image,
            title: item.name,
            subtitle: item?.artists[0].name
        }
    },
    'compilation': (item) => {
        return {
            id:  item.id,  
            imageURL: item.image,
            title: item.name,
            subtitle: item?.artists[0].name
        }
    },
    'user': (item) => {
        return {
            id:  item.id_utilisateur,
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