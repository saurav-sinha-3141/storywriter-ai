import { useState } from "react";
import Chat from "./Components/Chat";
import SystemPrompt from "./Prompts/SystemPrompt";
import Conversation from "./Components/Conversation";
const { GoogleGenerativeAI } = require("@google/generative-ai");

function App() {
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { role: "user", parts: [{ text: SystemPrompt }] },
  ]);

  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    generationConfig: {
      maxOutputTokens: 8192,
      temperature: 1.0,
    },
  });

  async function sendPrompt(newPrompt) {
    if (newPrompt === "") {
      setChatHistory([
        ...chatHistory,
        {
          role: "user",
          parts: [{ text: "Nothing to send" }],
        },
      ]);
      return;
    }

    const updatedChatHistory = [
      ...chatHistory,
      {
        role: "user",
        parts: [{ text: newPrompt }],
      },
    ];

    setChatHistory(updatedChatHistory);

    const chat = model.startChat({ history: updatedChatHistory });

    const result = await chat.sendMessageStream(newPrompt);
    let res = "";

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      res += chunkText;

      const incrementalChatHistory = [
        ...updatedChatHistory,
        {
          role: "model",
          parts: [{ text: res }],
        },
      ];

      setChatHistory(incrementalChatHistory);
    }

    const finalChatHistory = [
      ...updatedChatHistory,
      {
        role: "model",
        parts: [{ text: res }],
      },
    ];

    setChatHistory(finalChatHistory);
  }

  return (
    <>
      <div className="bg-black grid grid-cols-3 md:grid-cols-10">
        <Chat prompt={prompt} setPrompt={setPrompt} sendPrompt={sendPrompt} />
        <Conversation chatHistory={chatHistory} />
      </div>
    </>
  );
}

export default App;
