import React from "react";

interface CardProps {
  imgSrc: string;
  name?: string;
  role?: string;
}

const Card: React.FC<CardProps> = ({
  imgSrc,
  name = "John Doe",
  role = "Architect & Engineer",
}) => {
  return (
    <div className="w-[90%] max-w-[300px] text-center rounded-lg p-6 bg-white transition-all duration-300 transform shadow-[4px_4px_10px_rgba(0,0,0,0.2)] hover:scale-105 hover:shadow-[8px_8px_20px_rgba(0,0,0,0.3)]">
      {/* Image wrapper */}
      <div className="flex justify-center mb-4">
        <div className="relative w-[60vw] max-w-[220px] aspect-square rounded-full overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.5)] bg-black/40 p-1">
          <img
            src={imgSrc}
            alt={name}
            className="w-full h-full object-top object-cover rounded-full"
          />
        </div>
      </div>

      <h4 className="text-xl font-semibold text-black mb-1">{name}</h4>

      <div className="flex justify-center items-center w-full">
        <div className="w-[50%] h-0.5 sm:h-1 bg-black/50"></div>
      </div>

      <p className="text-sm text-gray-500 font-bold">{role}</p>
    </div>
  );
};

export default Card;
