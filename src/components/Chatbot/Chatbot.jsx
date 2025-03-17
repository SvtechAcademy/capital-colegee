import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaPhoneAlt, FaSms } from "react-icons/fa"; // Add Phone and SMS icons

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [context, setContext] = useState(""); // To track whether it's for English or Technology

  // Initialize Speech Recognition (Voice Input)
  const recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.interimResults = true;
  recognition.continuous = true;

  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    recognition.start();
    setIsListening(true);
  };

  const stopListening = () => {
    recognition.stop();
    setIsListening(false);
  };

  recognition.onresult = (event) => {
    const lastResult = event.results[event.results.length - 1];
    const spokenText = lastResult[0].transcript;
    setInput(spokenText); // Set input to the spoken text
    handleSendMessage(spokenText); // Process and respond with the voice input
  };

  // Initialize Speech Synthesis (Voice Response)
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  // Function to get bot's response based on user input and context
  const getBotResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();

    // Response when context is set to Technology
    if (context === "technology") {
      if (lowerCaseMessage.includes("computer")) {
        return "A computer is an electronic device used to process data and perform various tasks, such as calculations, data management, and internet browsing.";
      } else if (lowerCaseMessage.includes("software")) {
        return "Software refers to programs and applications that run on computers or mobile devices, allowing users to perform various tasks like word processing or gaming.";
      } else if (lowerCaseMessage.includes("graphics maintenance")) {
        return "Graphics maintenance involves updating, repairing, or optimizing graphics-related software, ensuring it runs smoothly and efficiently.";
      } else if (lowerCaseMessage.includes("web development")) {
        return "Web development is the process of building and maintaining websites. It includes tasks like designing the layout, coding, and ensuring the website works properly on all devices.";
      } else if (lowerCaseMessage.includes("app development")) {
        return "App development is the process of creating software applications for mobile devices or computers, from initial design to final release and maintenance.";
      } else if (lowerCaseMessage.includes("cloud computing")) {
        return "Cloud computing is the delivery of computing services like storage, processing, and networking over the internet, enabling businesses and users to access data and applications from anywhere.";
      } else if (lowerCaseMessage.includes("networking")) {
        return "Networking refers to connecting computers and devices together to share resources and information. It can involve setting up local area networks (LAN) or wide area networks (WAN).";
      } else if (lowerCaseMessage.includes("machine learning")) {
        return "Machine learning is a branch of artificial intelligence that involves training computers to recognize patterns and make decisions based on data, without explicit programming.";
      } else if (lowerCaseMessage.includes("cybersecurity")) {
        return "Cybersecurity is the practice of protecting computer systems, networks, and data from cyber threats such as hacking, phishing, and malware attacks.";
      }
    }

    // Response when context is set to English
    if (context === "english") {
      if (lowerCaseMessage.includes("greeting")) {
        return "In English, a greeting is a polite word or gesture used when meeting someone. For example, 'Hello!' or 'How are you?'";
      } else if (lowerCaseMessage.includes("hotel")) {
        return "At a hotel, you can ask for a room, inquire about prices, or ask for amenities. A typical conversation might be: 'I'd like to check in, please' or 'Do you have a room available for tonight?'";
      } else if (lowerCaseMessage.includes("taxi")) {
        return "In a taxi scenario, you might ask: 'How much is the fare to the airport?' or 'Could you take me to Main Street, please?'";
      } else if (lowerCaseMessage.includes("school")) {
        return "When talking about school, you might say: 'What time does the school start?' or 'Where is the library?'. It's important to use polite expressions like 'Please' and 'Thank you.'";
      } else if (lowerCaseMessage.includes("weather")) {
        return "To talk about the weather, you can say: 'What’s the weather like today?' or 'Is it going to rain tomorrow?'";
      } else if (lowerCaseMessage.includes("food")) {
        return "In English, you can say: 'What would you like to eat?' or 'I’m hungry, let’s go out for food.'";
      } else if (lowerCaseMessage.includes("shopping")) {
        return "When shopping, you can ask: 'How much is this item?' or 'Where can I find the electronics section?'";
      } else if (lowerCaseMessage.includes("directions")) {
        return "For directions, you might ask: 'How do I get to the nearest bank?' or 'Where is the bus station?'";
      }
    }

    // General fallback for other questions
    if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
      return "Hello! How can I help you today?";
    } else if (lowerCaseMessage.includes("how are you")) {
      return "I'm just a chatbot, but I'm doing great! How can I assist you?";
    } else if (lowerCaseMessage.includes("help")) {
      return "Sure! What can I help you with? Feel free to ask me anything.";
    } else if (lowerCaseMessage.includes("goodbye") || lowerCaseMessage.includes("bye")) {
      return "Goodbye! Feel free to reach out if you need anything.";
    } else if (lowerCaseMessage.includes("thank you") || lowerCaseMessage.includes("thanks")) {
      return "You're welcome! Let me know if you need anything else.";
    } else if (lowerCaseMessage.includes("name")) {
      return "I am Samuel Tegegn, your friendly chatbot. You can ask me about technology, English, and much more!";
    } else if (lowerCaseMessage.includes("how can I reach you")) {
      return "Sorry, I didn't understand that. If you need further help, please call or SMS 0913767842.";
    } else {
      return "Sorry, I didn't understand that. If you need further help, please call or SMS 0913767842.";
    }
  };

  // Handle context change when button is clicked
  const handleContextChange = (contextType) => {
    setContext(contextType);

    const introductionMessage = contextType === "technology"
      ? "I am Samuel Tegegn, your assistant for all things technology. Feel free to ask me about computers, software, graphics, maintenance, web development, and app development."
      : "I am Samuel Tegegn, your assistant for beginner to advanced English language learning. Ask me about greetings, hotels, taxis, schools, and more.";

    const botMessage = { text: introductionMessage, sender: "bot" };
    setMessages((prevMessages) => [...prevMessages, botMessage]);

    // Speak the introduction message
    speak(introductionMessage);
  };

  const handleSendMessage = (message = input) => {
    if (message.trim() === "") return;

    const userMessage = { text: message, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");

    setTimeout(() => {
      const botResponse = {
        text: getBotResponse(message), // Get dynamic response from bot
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);

      // Speak the bot's response
      speak(botResponse.text);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-[#0A1F2D] text-white">
      {/* Header */}
      <div className="p-4 bg-blue-900 text-center font-bold text-lg"> Capital College AI</div>

      {/* Context Selection */}
      <div className="flex justify-center items-center space-x-2 p-2 sm:flex-col sm:space-x-0 sm:space-y-4">
        <button
          className="font-bold text-lg px-3 py-1 bg-blue-600 rounded-full w-auto max-w-xs text-xs sm:text-sm hover:bg-blue-700 transition duration-200"
          onClick={() => handleContextChange("technology")}
        >
          Technology
        </button>
        <button
          className="px-3 py-1 bg-blue-600 rounded-full w-auto max-w-xs text-xs sm:text-sm hover:bg-blue-700 transition duration-200"
          onClick={() => handleContextChange("english")}
        >
          Health
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2 sm:space-y-4">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-2 max-w-xs rounded-lg ${
              msg.sender === "user" ? "bg-blue-600 self-end" : "bg-gray-700 self-start"
            } text-sm`}
          >
            {msg.text}
            {msg.text.includes("call or SMS 0913767842") && (
              <div className="mt-2 flex space-x-2">
                <a href="tel:0913767842" className="text-blue-400 flex items-center space-x-1">
                  <FaPhoneAlt />
                  <span>Call</span>
                </a>
                <a href="sms:0913767842" className="text-blue-400 flex items-center space-x-1">
                  <FaSms />
                  <span>SMS</span>
                </a>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-2 bg-gray-800 flex items-center sm:flex-col sm:space-y-2 sm:px-2">
        <input
          type="text"
          className="flex-1 p-2 rounded-lg text-black sm:w-full text-sm"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          className="ml-2 p-2 bg-blue-600 rounded-full sm:ml-0 sm:mt-2 text-sm hover:bg-blue-700 transition duration-200"
          onClick={() => handleSendMessage()}
        >
          <FaPaperPlane />
        </button>
        <button
          className="ml-2 p-2 bg-green-600 rounded-full sm:ml-0 sm:mt-2 text-sm hover:bg-green-700 transition duration-200"
          onClick={isListening ? stopListening : startListening}
        >
          {isListening ? "Stop Listening" : "Start Listening"}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
