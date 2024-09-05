import React from "react";

interface FlashingTextProps {
  text: string[];
  speed?: number;
}

const FlashingText: React.FC<FlashingTextProps> = ({
  text = [],
  speed = 10,
}) => {
  return (
    <div className="relative overflow-x-hidden whitespace-nowrap bg-white text-black">
      <ul
        className="animate-scroll-left whitespace-nowrap"
        style={{ animationDuration: `${speed}s` }}
      >
        {text.map((item, index) => (
          <li key={index} className="inline-block mr-8">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlashingText;
