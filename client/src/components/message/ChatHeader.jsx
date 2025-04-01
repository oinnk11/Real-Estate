import AccountContainer from "../AccountContainer.jsx";

const ChatHeader = ({ name, email }) => {
  return (
    <div>
      <AccountContainer />
      <div>
        <b>{name}</b>
        <p>{email}</p>
      </div>
    </div>
  );
};
export default ChatHeader;
