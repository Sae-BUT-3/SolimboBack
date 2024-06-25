const notif_related_fields = {
    "likeComment": "id_com",
    "replyComment": "id_com",
    "likeReview": "id_review",
    "replyReview": "id_review",
}
const deserializeNotification = (type, sender, receiver, id) => {
    const notification = {
        "type": type,
        "sender": sender,
        "receiver": receiver,
    }
    notification[notif_related_fields[type]] = id
    return notification
}

module.exports = {
    deserializeNotification
}