import ChatBotIcons from './ChatBotIcons';
import './ChatMessage.css';

const ChatMessage = ({ chat }) => {
  return (
    <div className={`message ${chat.role === 'bot' ? 'bot-message' : 'user-message'}`}>
      {chat.role === 'bot' && <ChatBotIcons />}
      <p className="message-text">{chat.text}</p>
    </div>
  );
};

export default ChatMessage;
