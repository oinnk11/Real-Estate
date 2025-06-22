import { useEffect, useRef, useState } from "react";
import { Popover } from "react-tiny-popover";
import { BotMessageSquare, Send, X } from "lucide-react";
import { twMerge } from "tailwind-merge";
import {
  getBotReply,
  getColorPaletteQuestions,
  getSpaceEstimationQuestions,
} from "../hooks/useBot";
import { toast } from "react-toastify";

const Chatbot = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const endRef = useRef(null);

  const [isLoadingMessage, setIsLoadingMessage] = useState(false);

  const [selectedQuestionCategory, setSelectedQuestionCategory] =
    useState(null);
  const [spaceEsitmationQuestions, setSpaceEsitmationQuestions] = useState([]);
  const [colorPaletteQuestions, setColorPaletteQuestions] = useState([]);

  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      message:
        "Hello! I'm Restie, your virtual assistant for Restate. How can I help you today with questions about properties or our services?",
      isBot: true,
    },
  ]);

  const fetchReply = async (message) => {
    setIsLoadingMessage(true);

    if (!message.trim()) {
      setIsLoadingMessage(false);
      return;
    }

    const response = await getBotReply(message);

    if (response.success) {
      setMessages((prev) => [...prev, { message: response.data, isBot: true }]);
    } else {
      toast.error(response.error);
    }

    setIsLoadingMessage(false);
  };

  const onSendMessage = (e) => {
    e.preventDefault();
    sendMessage(userMessage);
  };

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { message, isBot: false }]);
    setUserMessage("");
    setSelectedQuestionCategory(null);

    await fetchReply(message);
  };

  const sendMessageRef = useRef(null);

  const fetchSpaceEstimationQuestions = async () => {
    setIsLoadingMessage(true);
    const spaceEstimationResponse = await getSpaceEstimationQuestions();

    if (spaceEstimationResponse.success) {
      setSpaceEsitmationQuestions(spaceEstimationResponse.data);
    }

    setIsLoadingMessage(false);
  };

  const fetchColorPaletteQuestions = async () => {
    setIsLoadingMessage(true);
    const colorPaletteResponse = await getColorPaletteQuestions();

    if (colorPaletteResponse.success) {
      setColorPaletteQuestions(colorPaletteResponse.data);
    }
    setIsLoadingMessage(false);
  };

  const showSpaceEstimationQuestions = async () => {
    setMessages((prev) => [
      ...prev,
      { message: "Space Estimation", isBot: false },
    ]);
    setSelectedQuestionCategory("space-estimation");

    await fetchSpaceEstimationQuestions();

    setMessages((prev) => [
      ...prev,
      {
        message: "Here are few space estimation related questions.",
        isBot: true,
      },
    ]);
  };

  const showColorPaletteQuestions = async () => {
    setMessages((prev) => [
      ...prev,
      { message: "Color Palette", isBot: false },
    ]);
    setSelectedQuestionCategory("color-palette");

    await fetchColorPaletteQuestions();

    setMessages((prev) => [
      ...prev,
      { message: "Here are few color palette related questions.", isBot: true },
    ]);
  };

  useEffect(() => {
    setTimeout(() => {
      if (endRef.current) {
        endRef.current.scrollIntoView();
      }
    }, 0);
  }, [messages, popoverOpen]);

  // TODO: When selecting a category, set the select ques category
  // TODO: After the use selects a question related to a category, reset the select ques category

  return (
    <Popover
      isOpen={popoverOpen}
      positions={["left", "top"]}
      align="end"
      content={
        <div className="bg-white w-[calc(100vw-25vw)] rounded-lg h-[70vh] md:w-[400px] mr-3 shadow overflow-hidden flex flex-col">
          <div className="bg-primary p-2 text-white flex items-center gap-2">
            <div className="size-9 text-primary flex items-center justify-center bg-white rounded-full overflow-hidden">
              <BotMessageSquare />
            </div>
            <span>
              <strong>Restie</strong>
              <div className="flex items-center text-xs gap-1">
                <div className="bg-green-500 size-2 rounded-full" />
                <p>Online Now</p>
              </div>
            </span>
          </div>

          <div className="p-2 grow overflow-auto hide-scrollbar space-y-2">
            {messages.map((message, index) => {
              const isBot = message.isBot;
              const isLast = messages.length === index + 1;

              return (
                <div
                  key={`bot-messages-no-${index}`}
                  className="flex w-full gap-1"
                >
                  {isBot && (
                    <div className="size-9 text-white flex items-center justify-center bg-primary rounded-full overflow-hidden">
                      <BotMessageSquare />
                    </div>
                  )}

                  <div className="flex-1">
                    {isBot && (
                      <p className="font-medium text-xs text-muted">Restie</p>
                    )}
                    <div
                      className={twMerge(
                        "py-2 px-3 rounded-xl max-w-[80%] w-fit text-sm",
                        isBot ? "bg-black/10 " : "bg-primary text-white ml-auto"
                      )}
                    >
                      {message.message}
                    </div>
                    <div
                      className="space-x-2 space-y-2 mt-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {isBot &&
                        isLast &&
                        (selectedQuestionCategory ? (
                          selectedQuestionCategory === "space-estimation" ? (
                            <>
                              {spaceEsitmationQuestions.map((ques, index) => (
                                <button
                                  key={`space-estimation-ques-no-${index}`}
                                  onClick={() => {
                                    sendMessage(ques);
                                    setSelectedQuestionCategory(null);
                                  }}
                                  type="button"
                                  className="btn !text-left !text-xs text-primary border border-primary hover:bg-primary hover:text-white"
                                >
                                  {ques}
                                </button>
                              ))}
                            </>
                          ) : (
                            <>
                              {colorPaletteQuestions.map((ques, index) => (
                                <button
                                  key={`color-palette-ques-no-${index}`}
                                  onClick={() => {
                                    sendMessage(ques);
                                    setSelectedQuestionCategory(null);
                                  }}
                                  type="button"
                                  className="!text-left btn !text-xs text-primary border border-primary hover:bg-primary hover:text-white"
                                >
                                  {ques}
                                </button>
                              ))}
                            </>
                          )
                        ) : (
                          <>
                            <button
                              onClick={showSpaceEstimationQuestions}
                              type="button"
                              className="btn !text-xs text-primary border border-primary hover:bg-primary hover:text-white"
                            >
                              Space Esitimation
                            </button>

                            <button
                              onClick={showColorPaletteQuestions}
                              className="btn !text-xs text-primary border border-primary hover:bg-primary hover:text-white"
                            >
                              Color Pallete
                            </button>
                          </>
                        ))}
                    </div>
                  </div>
                </div>
              );
            })}
            {isLoadingMessage && (
              <div className="flex w-full gap-1">
                <div className="size-9 text-white flex items-center justify-center bg-primary rounded-full overflow-hidden">
                  <BotMessageSquare />
                </div>

                <div className="flex-1">
                  <p className="font-medium text-xs text-muted">Restie</p>
                  <div className="py-2 px-3 rounded-xl max-w-[80%] gap-1 w-fit text-sm bg-black/10 h-[36px] flex items-center">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0s]"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef}></div>
          </div>

          <form
            ref={sendMessageRef}
            onSubmit={onSendMessage}
            className="border-t flex items-center"
            disabled={isLoadingMessage}
          >
            <input
              value={userMessage}
              className="focus:outline-none w-full p-3 text-sm"
              placeholder="Ask something..."
              onChange={(e) => setUserMessage(e.target.value)}
            />
            <button
              disabled={isLoadingMessage}
              className="bg-primary h-full px-2 text-white rounded-l-lg w-[50px] flex items-center justify-center"
            >
              <Send />
            </button>
          </form>
        </div>
      }
      onClickOutside={() => setPopoverOpen(false)}
    >
      <button
        className="btn btn-primary aspect-square fixed right-5 bottom-5"
        style={{
          borderRadius: 100,
        }}
        onClick={() => setPopoverOpen(!popoverOpen)}
      >
        {popoverOpen ? (
          <X className="pointer-events-none" />
        ) : (
          <BotMessageSquare className="pointer-events-none" />
        )}
      </button>
    </Popover>
  );
};

export default Chatbot;
