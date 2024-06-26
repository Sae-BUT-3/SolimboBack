module.exports = class {
  constructor(
    notification,
    sender,
    receiver,
    comment,
    review,
    reply,
    createdAt
  ) {
    this.id_notification = notification.id_notification;
    this.is_old = notification.is_old;
    this.type = notification.type;
    this.sender = [sender];
    this.receiver = receiver;
    this.comment = comment;
    this.reply = reply;
    this.review = review;
    this.createdAt = createdAt;
  }
};
