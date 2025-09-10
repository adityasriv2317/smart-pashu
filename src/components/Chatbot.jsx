import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bot, Send } from "lucide-react";
import axios from "axios";
import formatText from "@/components/TextFormat";
import { useTranslations } from "next-intl";

const Chatbot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const t = useTranslations("chatbot");

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, chatOpen]);

  const handleSendMessage = async () => {
    const botApi = process.env.NEXT_PUBLIC_BOT_API;
    const botKey = process.env.NEXT_PUBLIC_BOT_KEY;

    if (!message.trim()) return;
    const userMessage = { sender: "user", text: message };
    const data = {
      contents: [
        {
          parts: [
            {
              text: `you are an expert assistant in cattle breed detection farm and this is the query from the user, ${message}. give appropriate and direct without confirming anything. Do not answer if the question is not related to cattle, cattle breeds or farm.`,
            },
          ],
        },
      ],
    };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);
    try {
      const response = await axios.post(botApi, data, {
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": `${botKey}`,
        },
      });
      const botMessage = {
        sender: "bot",
        text: response.data?.candidates?.[0]?.content?.parts?.[0]?.text,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!chatOpen && (
        <motion.button
          onClick={() => setChatOpen(true)}
          className="bg-green-700 hover:bg-green-800 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
        >
          <Bot className="w-7 h-7" />
        </motion.button>
      )}
      {/* Chatbot Modal */}
      <AnimatePresence>
        {chatOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm" // changed backdrop-blur-xs to sm for better effect
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 flex items-center justify-center"
            >
              <div className="bg-white w-full max-w-[98vw] sm:max-w-[90vw] md:max-w-2xl lg:max-w-3xl h-[90vh] sm:h-[85vh] md:h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-green-100">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-green-700 to-green-600 border-b border-green-200">
                  <div className="flex items-center gap-3">
                    <Bot className="w-7 h-7 text-white" />
                    <span className="text-lg font-semibold text-white">
                      {t("headerTitle")}
                    </span>
                  </div>
                  <button
                    onClick={() => setChatOpen(false)}
                    className="text-white bg-white/10 hover:bg-white/20 p-2 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-4 bg-green-50 space-y-3">
                  {messages.length === 0 && (
                    <div className="text-center text-gray-400 mt-10">
                      {t("welcomeMessage")}
                    </div>
                  )}
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-2 rounded-2xl shadow-sm text-base ${
                          msg.sender === "user"
                            ? "bg-green-700 text-white rounded-br-none"
                            : "bg-white text-gray-800 border border-green-100 rounded-bl-none"
                        }`}
                      >
                        {/* Assuming you have your formatText functions */}
                        <pre className="whitespace-pre-wrap font-sans text-base">
                          {msg.sender === "bot"
                            ? formatText(msg.text).replace(
                                /^Here are the key areas to focus on:\s*/i,
                                ""
                              )
                            : msg.text}
                        </pre>
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-white text-gray-400 px-4 py-2 rounded-2xl border border-green-100 animate-pulse">
                        {t("loadingIndicator")}
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
                {/* Input */}
                <div className="p-4 border-t border-green-100 bg-white">
                  <div className="flex gap-2">
                    <textarea
                      rows={1}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder={t("inputPlaceholder")}
                      className="flex-1 px-4 py-2 rounded-xl border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 resize-none text-base text-gray-800 bg-green-50 placeholder-gray-400"
                    />
                    <motion.button
                      onClick={handleSendMessage}
                      disabled={!message.trim() || loading}
                      className="bg-green-700 hover:bg-green-800 text-white p-3 rounded-xl shadow disabled:opacity-50 flex items-center justify-center"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 text-center">
                    {t("inputHelper")}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
