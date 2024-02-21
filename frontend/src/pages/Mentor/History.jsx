import React, { useState } from "react";

const History = () => {
  const chatData = [
    { mentor1: "bwhbdskwdssw", mentee1: "bdkjsdjsdjsj" },
    { mentor4: "bwhbdskwdssw", mentee4: "" },
    { mentor2: "bwhbdskwdssw", mentee2: "bdkjsdjsdjsj" },
    { mentor3: "bwhbdskwdssw", mentee3: "bdkjsdjsdjsj" },
    { mentor3: "bwhbdskwdssw", mentee3: "bdkjsdjsdjsj" },
    { mentor3: "bwhbdskwdssw", mentee3: "" },
    { mentor3: "bwhbdskwdssw", mentee3: "bdkjsdjsdjsj" },
    { mentor3: "bwhbdskwdssw", mentee3: "bdkjsdjsdjsj" },
    { mentor3: "bwhbdskwdssw", mentee3: "" },
    { mentor3: "bwhbdskwdssw", mentee3: "bdkjsdjsdjsj" },
  ];
  const [selectedChat, setSelectedChat] = useState(null);

  const handleChatClick = (index) => {
    setSelectedChat(index);
  };

  return (
    <div>
      {chatData.map((chat, index) => (
        <div
          key={index}
          className={`mb-4 p-6 rounded-lg transition-transform transform hover:scale-110 ${
            selectedChat === index
              ? "border bg-white text-black"
              : "border bg-white text-black"
          }`}
          onClick={() => handleChatClick(index)}
        >
          {Object.entries(chat).map(([key, value]) => (
            <div key={key} className="flex mb-2">
              <span className="font-bold">{key}:</span>
              {value ? (
                <span className="ml-2">{value}</span>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder={`Enter ${key}`}
                    className="border p-1 ml-2"
                  />
                  <button className="absolute bottom-1 right-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                    Reply
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default History;
