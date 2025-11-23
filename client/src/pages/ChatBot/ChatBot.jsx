import { useEffect, useRef, useState } from 'react';
import ChatBotForm from '../../componenets/ChatBot/ChatBotForm';
import ChatMessage from '../../componenets/ChatBot/ChatMessage';
import ChatBotIcons from '../../componenets/ChatBot/ChatBotIcons';
import './ChatBot.css';
import { GoogleGenerativeAI } from '@google/generative-ai';


const ChatBot = () => {
  
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef();

  const apiKey = import.meta.env.VITE_APP_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  // Function to get AI response
  const getGeminiResponse = async (userMessage) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
      const result = await model.generateContent(userMessage);
      const response = await result.response;
      const text = await response.text();
      return text;
    } catch (error) {
      console.error("Error generating content:", error);
      return "You reached maximum limit of requests. Please upgrate your plan or Try again later.";
    }
  };

  // Handles the bot response
  const generateBotResponse = async (history) => {
    setChatHistory(prev => [...prev, { role: "bot", text: "Typing..." }]);

    try {
      const userMessage = history[history.length - 1]?.text || "Hello";
      const botReply = await getGeminiResponse(userMessage);

      setChatHistory(prev => [
        ...prev.filter(msg => msg.text !== "Typing..."),
        { role: "bot", text: botReply }
      ]);
    } catch (error) {
      console.error("Error generating bot response:", error);
      setChatHistory(prev => [
        ...prev.filter(msg => msg.text !== "Typing..."),
        { role: "bot", text: "Too many requests. Please try again later." }
      ]);
    }
  };

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      {/* Chat toggle button */}
      
      <button onClick={() => setShowChatbot(prev => !prev)} id="chatbot-toggler">
        <span className="material-symbols-rounded">↑</span>
      </button>

      {/* Chatbot popup */}
      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <ChatBotIcons />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button
            onClick={() => setShowChatbot(prev => !prev)}
            className="material-symbols-rounded"
          >
            ↓
          </button>
        </div>

        <div ref={chatBodyRef} className="chat-body">
          {/* Welcome message */}
          <div className="message bot-message">
            <ChatBotIcons />
            <p className="message-text">Hey! How can I help you today?</p>
          </div>

          {/* Display chat history */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        <div className="chat-footer">
          <ChatBotForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
