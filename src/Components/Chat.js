import React from "react";

const Chat = ({ prompt, setPrompt, sendPrompt }) => {
  return (
    <div className="min-h-screen col-span-1 md:col-span-2">
      <textarea
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
        className="bg-white text-black p-2 m-4 rounded outline-none w-[80%]"
        placeholder="Enter text here"
      />
      <button
        className="text-white bg-blue-500 p-2 m-4 rounded w-[80%] hover:bg-green-500"
        onClick={() => sendPrompt(prompt)}
      >
        Click
      </button>
    </div>
  );
};

export default Chat;
