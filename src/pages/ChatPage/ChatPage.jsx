import React, { useState, useRef, useEffect } from 'react';
import './ChatPage.css';

const INTRO_MESSAGE = "Welcome to Law Bot. I am an AI assistant designed to provide general information on Indian law. Please state your legal query. Note: I am not a substitute for a qualified lawyer.";
const TYPING_SPEED = 10; 

function ChatPage() {
  const [messages, setMessages] = useState([]); 
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // --- REFINED TYPING ANIMATION LOGIC ---
  useEffect(() => {
    let i = 0;
    // Temporarily show a blank message for the avatar
    setMessages([{ text: '', sender: 'bot' }]); 
    
    const typingInterval = setInterval(() => {
      if (i < INTRO_MESSAGE.length) {
        // Update the text of the first message
        setMessages([{ text: INTRO_MESSAGE.substring(0, i + 1), sender: 'bot' }]);
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, TYPING_SPEED);

    return () => clearInterval(typingInterval); 
  }, []); 

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const streamBotResponse = (textToStream) => {
    setMessages(prev => [...prev, { text: '', sender: 'bot' }]);
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < textToStream.length) {
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = textToStream.substring(0, i + 1);
          return newMessages;
        });
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, TYPING_SPEED);
    return () => clearInterval(typingInterval);
  };

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage = { text: input, sender: 'user' };
    // Here we ensure the intro message is fully replaced by the new conversation
    setMessages(prev => {
        // If it's the first message, replace the intro. Otherwise, add to the list.
        if (prev.length === 1 && prev[0].sender === 'bot') {
            return [prev[0], userMessage];
        }
        return [...prev, userMessage];
    });

    setIsLoading(true);
    setInput('');

    try {
      const response = await fetch('https://law-bot-backend-melvin.onrender.com/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input }),
      });
      
      if (!response.ok) {
        // Handle server errors (like 500)
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      setIsLoading(false);
      streamBotResponse(data.answer); 
      
    } catch (error) {
      console.error("Error fetching from backend:", error);
      setIsLoading(false); 
      streamBotResponse("Sorry, I'm having trouble connecting. Please try again later.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  return (
    <div className="chat-page">
      <aside className="chat-sidebar">
        <button className="new-chat-button">
          <span className="plus-icon">+</span>
          New Chat
        </button>
        <div className="chat-history">
          <div className="history-item"><span>💬</span> Previous Chat 1</div>
          <div className="history-item"><span>💬</span> Previous Chat 2</div>
        </div>
      </aside>

      <main className="chat-main">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}-message`}>
              <div className={`message-avatar ${message.sender}-avatar`}>
                {message.sender === 'bot' ? '⚖️' : 'U'}
              </div>
              <div className="message-content">
                {message.text}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="message bot-message">
              <div className="message-avatar bot-avatar">⚖️</div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-container">
          <div className="chat-input-wrapper">
            <textarea
              className="chat-input"
              placeholder="Type your legal question here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows="1"
            />
            <button 
              className="send-button"
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ChatPage;