import { useState } from "react";
import Chat from "./Components/Chat";
import Response from "./Components/Response";
const { GoogleGenerativeAI } = require("@google/generative-ai");

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("N");

  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

  async function sendPrompt(prompt) {
    const result = await model.generateContentStream(prompt);
    let res = ""
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      res += chunkText
      setResponse(res);
    }
  }

  return (
    <>
      <div className="bg-black grid grid-cols-3 md:grid-cols-10">
        <Chat prompt={prompt} setPrompt={setPrompt} sendPrompt={sendPrompt} />
        <Response response={response} />
      </div>
    </>
  );
}

export default App;
