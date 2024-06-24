const notif_related_fields = {
    "likeComment": "id_com",
    "replyComment": "id_com",
    "likeReview": "id_review",
    "replyReview": "id_review",
}
const deserializeNotification = (type, sender, revciever, id) => {
    const notification = {
        "type": type,
        "sender": sender,
        "receiver": revciever,
    }
    notification[notif_related_fields[type]] = id
    return notif_related_fields
}

module.exports = {
    deserializeNotification
}