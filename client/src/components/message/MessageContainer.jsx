import DateSeparator from "./DateSeparator.jsx";
import MessageBubble from "./MessageBubble.jsx";
import { isSameDay, isSameHour } from "date-fns";

const MessageContainer = ({ message, prevMessage, nextMessage }) => {
  let showDateSeparator = true;
  let isNewGroup = true;
  let showAvatar = true;
  const messageSentAt = new Date(message.createdAt);

  if (prevMessage) {
    const prevMessageSentAt = new Date(prevMessage.createdAt);
    showDateSeparator = !isSameDay(messageSentAt, prevMessageSentAt);
  }

  if (nextMessage) {
    const nextMessageSentAt = new Date(nextMessage.createdAt);
    const isSameBlock = isSameHour(messageSentAt, nextMessageSentAt);
    const isNextSender = nextMessage.sender.id === message.sender.id;
    const isNextNewBlock =
      !isSameHour(messageSentAt, nextMessageSentAt) || !isNextSender;

    isNewGroup = !isSameBlock || !isNextSender;
    showAvatar = isNextNewBlock;
  }

  return (
    <div>
      {showDateSeparator && <DateSeparator date={message.createdAt} />}
      <MessageBubble message={message} showAvatar={showAvatar} />
      {isNewGroup && nextMessage && <div className="h-0.5" />}
    </div>
  );
};
export default MessageContainer;
