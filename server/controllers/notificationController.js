import { handleError } from "../utils/handleError.js";
import User from "../database/models/users.js";
import Notification from "../database/models/notifications.js";
import Listing from "../database/models/listings.js";

export const getNotifications = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId)
      return res.status(400).json({ message: "User ID is required." });

    const user = await User.findByPk(userId);

    if (!user) return res.status(404).json({ message: "User not found." });

    const notifications = await Notification.findAll({
      where: { userId },
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
          as: "user",
        },
        {
          model: Listing,
          attributes: ["id", "title", "price", "description", "thumbnail"],
          as: "listing",
        },
      ],
    });

    return res.status(200).json(notifications);
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { id: notificationId } = req.params;

    if (!notificationId)
      return res.status(400).json({ message: "Notification ID is required." });

    const notification = await Notification.findByPk(notificationId);

    if (!notification)
      return res
        .status(404)
        .json({ message: "Notification not found or already deleted." });

    if (notification.userId !== userId)
      return res
        .status(400)
        .json({ message: "Notification can't be deleted." });

    await Notification.destroy({ where: { id: notificationId } });

    return res
      .status(200)
      .json({ message: "Notification deleted successfully." });
  } catch (error) {
    handleError(error, res);
  }
};
