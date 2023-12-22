import { Carousel } from "flowbite-react";
import React from "react";

const CarouselComponent = () => {
  return (
    <div className="h-56 pt-16 sm:h-64 lg:h-[70vh] 2xl:h-96">
      <Carousel leftControl={false}>
        <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
          Slide 1
        </div>
        <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
          Slide 2
        </div>
        <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
          Slide 3
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
