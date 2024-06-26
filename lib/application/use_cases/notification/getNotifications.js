const throwStatusCode = require("../utils/throwStatusCode");
const {
  notificationSerializer,
} = require("../../../interfaces/serializers/NotificationSerializer");
const reviewSerializer = require("../../../interfaces/serializers/ReviewSerializer");
const serializeLike = (notification, notications, key) => {
  if (notications[key]) {
    notications[key].sender.push(notification.sender[0]);
    return {}
  }
  notications[key] = notification;
};

module.exports = async (
  userToken,
  page,
  pageSize,
  { notificationRepository, accessTokenManager, userRepository,spotifyRepository,
    reviewRepository,
    friendRepository }
) => {
  const id_utilisateur = accessTokenManager.decode(userToken)?.value;
  if (!(await userRepository.getByUser(id_utilisateur)))
    throwStatusCode(401, "votre token d'authentification n'est pas le bon");
  const notificationsRaw = await notificationRepository.getNotifications(
    id_utilisateur,
    page,
    pageSize
  );
  const notification = {};
  const notifIds = []
  const promises = notificationsRaw.map((item) => async () => {
    notifIds.push(item.id_notification)
    if (item.comment) {
      if (item.reply) {
        item.type = "reply";
        notification[`replyComment-${item.reply.id_com}`] = item;
        return {}
      }
      item.type = "like";
      const key = `likeComment-${item.comment.id_com}`;
      serializeLike(item, notification, key);
      return {}
    }
    if (item.review) {
      item.review = await reviewSerializer(
        item.review,
        id_utilisateur,
        [],
        spotifyRepository,
        reviewRepository,
        friendRepository
      );
      if (item.reply) {
        item.type = "reply";
        notification[`replyReview-${item.reply.id_com}`] = item;
        return {}
      }
      item.type = "like";
      const key = `likeReview-${item.review.id_review}`;
      serializeLike(item, notification, key);
      return {}
    }
    item.type = "follow";
    const key = `follow-${item.receiver.id_utilisateur}`;
    serializeLike(item, notification, key);
    return {}
  });
  await   Promise.all(promises.map(fn => fn())).then(results => {
  });
  await notificationRepository.setOld(notifIds);
  return Object.keys(notification).reduce((accumulator, currentValue) => {
    accumulator.push(notificationSerializer(notification[currentValue]));
    return accumulator;
  }, []);
};
