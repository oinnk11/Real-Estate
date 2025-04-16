import { MessageCircle } from "lucide-react";

const Inbox = () => {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col gap-4 p-4">
      <MessageCircle className="size-12" />
      <h2 className="text-xl font-bold">Your Messages</h2>
    </div>
  );
};

export default Inbox;
