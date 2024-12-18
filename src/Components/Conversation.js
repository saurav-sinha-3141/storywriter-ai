import React from "react";

const Conversation = ({ chatHistory }) => {
  function parser(markdown) {
    // Step 1: Convert headings
    markdown = markdown.replace(
      /^#{6}\s?(.*)/gm,
      "<h6 class='text-sm font-semibold text-white'>$1</h6>"
    );
    markdown = markdown.replace(
      /^#{5}\s?(.*)/gm,
      "<h5 class='text-base font-semibold text-white'>$1</h5>"
    );
    markdown = markdown.replace(
      /^#{4}\s?(.*)/gm,
      "<h4 class='text-lg font-semibold text-white'>$1</h4>"
    );
    markdown = markdown.replace(
      /^#{3}\s?(.*)/gm,
      "<h3 class='text-xl font-semibold text-white'>$1</h3>"
    );
    markdown = markdown.replace(
      /^#{2}\s?(.*)/gm,
      "<h2 class='text-2xl font-bold text-white'>$1</h2>"
    );
    markdown = markdown.replace(
      /^#\s?(.*)/gm,
      "<h1 class='text-3xl font-bold text-white'>$1</h1>"
    );

    // Step 2: Convert bold text (**bold**)
    markdown = markdown.replace(
      /\*\*(.*?)\*\*/g,
      "<strong class='font-bold'>$1</strong>"
    );

    // Step 3: Convert links ([text](url))
    markdown = markdown.replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" class="text-blue-600 hover:text-blue-800">$1</a>'
    );

    // Step 4: Convert unordered lists (- item)
    markdown = markdown.replace(
      /^\s*-\s(.*)/gm,
      "<li class='list-disc pl-5'>$1</li>"
    );
    markdown = markdown.replace(
      /(<li>.*<\/li>)/gms,
      "<ul class='mb-4'>$1</ul>"
    );

    // Step 5: Convert line breaks
    markdown = markdown.replace(/\n/g, "<br>");

    return markdown;
  }

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
                  dangerouslySetInnerHTML={{
                    __html: parser(chat.parts[0].text),
                  }}
                />
              )
            );
          })}
        </div>
      )}
    </>
  );
};

export default Conversation;
