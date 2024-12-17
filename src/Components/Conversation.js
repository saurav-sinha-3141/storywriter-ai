import React from "react";

const Conversation = ({ chatHistory }) => {
  return (
    <>
      {chatHistory.length === 1 ? (
        <div className="text-white col-span-2 md:col-span-8 p-4 m-4 bg-gray-600 h-fit rounded">
          No conversations yet
        </div>
      ) : (
        <div className="text-white col-span-2 md:col-span-8 p-4 m-4 bg-gray-600 h-fit rounded">
          {chatHistory.map((chat, index) => {
            return (
              index !== 0 && (
                <div
                  key={index}
                  className={`rounded p-4 m-4 ${
                    chat.role === "user"
                      ? "text-black bg-white"
                      : "text-white bg-black"
                  }`}
                >
                  {chat.parts[0].text}
                </div>
              )
            );
          })}
        </div>
      )}
    </>
  );
};

export default Conversation;
