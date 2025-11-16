import React, { useRef, useState } from 'react'

const ChatBotForm = ({chatHistory, setChatHistory, generateBotResponse}) => {

     const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Heloooooooooooo")
        if (!message.trim()) return;

        // Add user's message to chat
        const newChat = { role: "user", text: message };
        const updatedHistory = [...chatHistory, newChat];
        setChatHistory(updatedHistory);

        // Clear input box
        setMessage("");

        // Generate bot response
        generateBotResponse(updatedHistory);
    };

    return (
        <form className="chat-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="message-input"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
            />
            <button type="submit">➤</button>
        </form>
    );
};
export default ChatBotForm
