import React from "react";

const Response = ({ response }) => {
  return (
    <div className="text-white col-span-2 md:col-span-8 p-4 m-4 bg-gray-600 h-fit rounded">
      {response}
    </div>
  );
};

export default Response;
