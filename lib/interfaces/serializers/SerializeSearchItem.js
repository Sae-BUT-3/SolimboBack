const seralizer = {
    'artist': (item) => {
        return {
<<<<<<< HEAD
            id:  item.id,
            imageURL: item.image,
=======
            imageURL: item.images[0]?.url,
>>>>>>> ff40bc4 (resolution conflits)
            title: item.name,
            subtitle: ''
        }

    },
    'album': (item) => {
        return {
<<<<<<< HEAD
            id:  item.id,
            imageURL: item.image,
=======
            imageURL: item.images[0]?.url,
>>>>>>> ff40bc4 (resolution conflits)
            title: item.name,
            subtitle: item?.artists[0].name
        }
    },
    'track': (item) => {
        return {
<<<<<<< HEAD
            id:  item.id,
            imageURL: item.album.image,
=======
            imageURL: item.album.images[0]?.url,
>>>>>>> ff40bc4 (resolution conflits)
            title: item.name,
            subtitle: item?.artists[0].name
        }
    },
    'single': (item) => {
        return {
<<<<<<< HEAD
            id:  item.id,
           
            imageURL: item.image,
=======
            imageURL: item.images[0]?.url,
>>>>>>> ff40bc4 (resolution conflits)
            title: item.name,
            subtitle: item?.artists[0].name
        }
    },
    'compilation': (item) => {
        return {
<<<<<<< HEAD
            id:  item.id,  
            imageURL: item.image,
=======
            imageURL: item.images[0]?.url,
>>>>>>> ff40bc4 (resolution conflits)
            title: item.name,
            subtitle: item?.artists[0].name
        }
    },
    'user': (item) => {
        return {
<<<<<<< HEAD
            id:  item.id_utilisateur,
=======
>>>>>>> ff40bc4 (resolution conflits)
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