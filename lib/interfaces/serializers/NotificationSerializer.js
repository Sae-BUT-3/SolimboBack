const UserPublic = require("../../domain/model/UserPublic");
const Notification = require("../../domain/model/Notification");
const ReviewPublic = require("../../domain/model/ReviewPublic");
const notif_related_fields = {
  likeComment: "id_com",
  replyComment: "id_com",
  likeReview: "id_review",
  replyReview: "id_review",
};
const deserializeNotification = (type, sender, receiver, id, reply) => {
  const notification = {
    type,
    sender,
    receiver,
  };
  if (reply) notification.reply = reply;
  notification[notif_related_fields[type]] = id;
  return notification;
};

const notificationSerializer = (notification) => {
  const { sender, receiver, comment, reply, review } = notification;
  return new Notification(
    notification,
    sender.map((sender) => new UserPublic(sender)),
    new UserPublic(receiver),
    comment,
    review,
    reply
  );
};
module.exports = {
  deserializeNotification,
  notificationSerializer,
};
