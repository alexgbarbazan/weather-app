import React, { useState, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {   
handlePrevFunction: () => void;
  handleNextFunction: () => void;
  children: ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ handleNextFunction, handlePrevFunction, children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    handlePrevFunction?.();
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? children.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    handleNextFunction?.();
    setCurrentIndex((prevIndex) =>
      prevIndex === children.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handlePrev}
        className="p-2 transition-colors -translate-y-1/2 rounded-full left-4 bg-white/50 hover:bg-white/75"
      >
        <ChevronLeft className="text-black" />
      </button>
      <div className="relative w-full max-w-xl mx-auto overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {children.map((child, index) => (
            <div key={index} className="flex-shrink-0 w-full">
              {child}
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}

        {/*  */}
      </div>
      <button
        onClick={handleNext}
        className="p-2 transition-colors -translate-y-1/2 rounded-full bg-white/50 hover:bg-white/75"
      >
        <ChevronRight className="text-black" />
      </button>
    </div>
  );
};

export default Carousel;
