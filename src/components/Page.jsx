import { motion } from 'framer-motion';
import { useState } from 'react';
import ValentinePage from './ValentinePage';
import FoodCollage from './FoodCollage';
import PhotoCollage from './PhotoCollage';
import ConnectionsGame from './ConnectionsGame';

const Page = ({ 
  pageData, 
  zIndex, 
  isFlipped = false,
  initialRotation = 0,
  isFlipping = false,
  showValentineOnBack = false,
  isCurrentPage = false,
}) => {
  // Check if this is the last page and should show Valentine page
  if (showValentineOnBack && pageData.id === 5) {
    return (
      <motion.div
        className="absolute w-full h-full page-3d"
        style={{
          zIndex,
          transformStyle: 'preserve-3d',
          transformOrigin: 'left center',
        }}
        initial={{ rotateY: initialRotation }}
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{
          duration: isFlipping ? 1.2 : 0,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <div className="absolute w-full h-full page-backface" style={{ backfaceVisibility: 'hidden' }}>
          <ValentinePage isNested={true} />
        </div>
      </motion.div>
    );
  }

  // Check if this is a food collage page
  if (pageData.content?.type === 'collage') {
    return (
      <motion.div
        className="absolute w-full h-full page-3d"
        style={{
          zIndex,
          transformStyle: 'preserve-3d',
          transformOrigin: 'left center',
        }}
        initial={{ rotateY: initialRotation }}
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{
          duration: isFlipping ? 1.2 : 0,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <div className="absolute w-full h-full page-backface" style={{ backfaceVisibility: 'hidden' }}>
          <FoodCollage collageData={pageData.content} />
        </div>
      </motion.div>
    );
  }

  // Check if this is a photo collage page
  if (pageData.content?.type === 'photoCollage') {
    return (
      <motion.div
        className="absolute w-full h-full page-3d"
        style={{
          zIndex,
          transformStyle: 'preserve-3d',
          transformOrigin: 'left center',
        }}
        initial={{ rotateY: initialRotation }}
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{
          duration: isFlipping ? 1.2 : 0,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <div className="absolute w-full h-full page-backface" style={{ backfaceVisibility: 'hidden' }}>
          <PhotoCollage collageData={pageData.content} />
        </div>
      </motion.div>
    );
  }

  // Check if this is a connections game page
  if (pageData.content?.type === 'connectionsGame') {
    return (
      <motion.div
        className="absolute w-full h-full page-3d"
        style={{
          zIndex,
          transformStyle: 'preserve-3d',
          transformOrigin: 'left center',
        }}
        initial={{ rotateY: initialRotation }}
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{
          duration: isFlipping ? 1.2 : 0,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <div className="absolute w-full h-full page-backface" style={{ backfaceVisibility: 'hidden' }}>
          <ConnectionsGame gameData={pageData.content} />
        </div>
      </motion.div>
    );
  }

  // Regular page with image and quote
  return (
    <motion.div
      className="absolute w-full h-full page-3d"
      style={{
        zIndex,
        transformStyle: 'preserve-3d',
        transformOrigin: 'left center',
      }}
      initial={{ rotateY: initialRotation }}
      animate={{
        rotateY: isFlipped ? 180 : 0,
      }}
      transition={{
        duration: isFlipping ? 1.2 : 0,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <div className="absolute w-full h-full page-backface" style={{ backfaceVisibility: 'hidden' }}>
        <PageSide
          sideData={pageData.content}
        />
      </div>
    </motion.div>
  );
};

const PageSide = ({ sideData }) => {
  const [isShaking, setIsShaking] = useState(false);

  const handleCloudClick = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
    }, 500);
  };

  return (
    <div
      className={`w-full h-full paper-texture ${sideData.backgroundColor} flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 pb-40 sm:pb-0 relative`}
    >
      {/* Cloud/Bubble */}
      {sideData.cloudMessage && (
        <motion.div 
          className="absolute top-8 sm:top-12 md:top-16 left-1/2 transform -translate-x-1/2 z-30 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg cursor-pointer"
          onClick={handleCloudClick}
        >
          <motion.div 
            className="bg-white rounded-full shadow-2xl px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 border-2 border-romantic-red/20"
            animate={isShaking ? {
              x: [0, -10, 10, -10, 10, -5, 5, 0],
              rotate: [0, -5, 5, -5, 5, 0],
            } : {}}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <p className="font-dancing text-base sm:text-lg md:text-xl lg:text-2xl text-romantic-red-dark text-center">
              {sideData.cloudMessage}
            </p>
          </motion.div>
        </motion.div>
      )}

      {sideData.imageURL && (
        <div className="w-full h-[80%] sm:h-3/4 mb-2 sm:mb-4 rounded-lg overflow-hidden shadow-lg bg-white relative z-10">
          <img
            src={sideData.imageURL}
            alt="Scrapbook memory"
            className="w-full h-full object-cover"
            style={{ 
              objectPosition: 'center',
              imageRendering: 'auto',
              WebkitImageRendering: '-webkit-optimize-contrast',
              backfaceVisibility: 'hidden',
              willChange: 'transform',
            }}
            onError={(e) => {
              e.target.style.display = 'none';
              const parent = e.target.parentElement;
              if (parent && !parent.querySelector('.placeholder')) {
                const placeholder = document.createElement('div');
                placeholder.className = 'placeholder w-full h-full bg-romantic-pink-light flex items-center justify-center text-romantic-red-dark font-inter text-sm';
                placeholder.textContent = 'Image placeholder - Add your image to /public/images/';
                parent.appendChild(placeholder);
              }
            }}
          />
        </div>
      )}
      
      {sideData.quoteText && (
        <div className="w-full flex-1 flex flex-col items-center justify-center">
          <p className="font-dancing text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-romantic-red-dark text-center mb-1 sm:mb-2 md:mb-3 px-2 sm:px-4 leading-snug break-words">
            "{sideData.quoteText}"
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;
