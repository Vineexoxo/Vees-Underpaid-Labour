import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const FoodCollage = ({ collageData }) => {
  // Move the quote boxes upward on small screens so they don't sit under bottom controls.
  const [quoteShiftPx, setQuoteShiftPx] = useState(0);
  const [imageShiftPx, setImageShiftPx] = useState(0);

  useEffect(() => {
    const update = () => {
      const isMobile = window.innerWidth < 640;
      // Always keep "bottom" quotes clear of the fixed Next/Previous controls.
      const shift = isMobile ? Math.round(Math.min(120, window.innerHeight * 0.14)) : 220;
      setQuoteShiftPx(shift);
      // Push bottom-positioned images upward on phones so they don't cover quotes/text.
      const imgShift = isMobile ? Math.round(Math.min(140, window.innerHeight * 0.09)) : 0;
      setImageShiftPx(imgShift);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const addTranslateY = (baseTransform, shouldShift) => {
    if (!quoteShiftPx || !shouldShift) return baseTransform;
    const cleaned = (baseTransform || '').trim();
    const suffix = `translateY(-${quoteShiftPx}px)`;
    return cleaned ? `${cleaned} ${suffix}` : suffix;
  };

  return (
    <div
      className={`w-full h-full paper-texture ${collageData.backgroundColor} relative overflow-y-auto overflow-x-hidden px-2 sm:px-0`}
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Corner decorations */}
        <div className="absolute top-4 left-4 text-romantic-red/20 text-6xl">❦</div>
        <div className="absolute top-4 right-4 text-romantic-red/20 text-6xl">❦</div>
        <div className="absolute bottom-4 left-4 text-romantic-red/20 text-6xl">❦</div>
        <div className="absolute bottom-4 right-4 text-romantic-red/20 text-6xl">❦</div>
        
        {/* Decorative hearts scattered */}
        <div className="absolute top-20 left-10 text-romantic-pink/30 text-3xl">💕</div>
        <div className="absolute top-30 right-20 text-romantic-pink/30 text-3xl">💕</div>
        <div className="absolute bottom-30 left-20 text-romantic-pink/30 text-3xl">💕</div>
        <div className="absolute bottom-20 right-30 text-romantic-pink/30 text-3xl">💕</div>
        
        {/* Decorative lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-romantic-red/20 to-transparent"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-romantic-red/20 to-transparent"></div>
      </div>

      {/* Food Images */}
      {collageData.foodImages?.map((food, index) => (
        <motion.div
          key={index}
          className="absolute shadow-2xl rounded-lg overflow-hidden border-4 border-white"
          style={{
            ...food.position,
            width: food.position.width,
            zIndex: 5 + index,
            transform: food.position?.bottom ? `translateY(-${imageShiftPx}px)` : undefined,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <div className="relative w-full h-full">
            <img
              src={food.imageURL}
              alt={`Food ${index + 1}`}
              className="w-full h-full object-cover"
              style={{
                transform: `rotate(${food.position.rotation || 0}deg)`,
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                const parent = e.target.parentElement;
                if (parent && !parent.querySelector('.placeholder')) {
                  const placeholder = document.createElement('div');
                  placeholder.className = 'placeholder w-full h-full bg-romantic-pink-light flex items-center justify-center text-romantic-red-dark font-inter text-xs p-2';
                  placeholder.textContent = `Food ${index + 1}`;
                  parent.appendChild(placeholder);
                }
              }}
            />
            {/* Rating overlay */}
            {food.rating && (
              <div 
                className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent px-2 py-2 flex items-center justify-center"
                style={{
                  transform: `rotate(${food.position.rotation || 0}deg)`,
                  transformOrigin: 'center center',
                }}
              >
                <span className="text-white font-inter font-bold text-sm sm:text-base md:text-lg drop-shadow-lg">
                  {food.rating}/10
                </span>
              </div>
            )}
          </div>
          {/* Polaroid-style border effect */}
          <div className="absolute inset-0 border-2 border-white/50 pointer-events-none"></div>
        </motion.div>
      ))}

      {/* Quotes */}
      {collageData.quotes?.map((quote, index) => (
        <motion.div
          key={index}
          className="absolute z-[3] pointer-events-none"
          style={{
            ...(quote.position || {}),
            transform: addTranslateY(quote.position?.transform, !!quote.position?.bottom),
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
        >
          <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg border-2 border-romantic-red/30 max-w-[88vw]">
            <p className={`font-dancing ${quote.fontSize || 'text-xl'} text-romantic-red-dark text-center whitespace-normal break-words leading-snug`}>
              "{quote.text}"
            </p>
          </div>
          {/* Decorative underline */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-romantic-red/40"></div>
        </motion.div>
      ))}

      {/* Title */}
      <motion.div
        className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
      </motion.div>

      {/* Scroll buffer so bottom text can be revealed by scrolling */}
      <div className="pointer-events-none h-[90vh] sm:h-[75vh] md:h-[55vh] lg:h-[45vh]" aria-hidden="true" />

    </div>
  );
};

export default FoodCollage;
