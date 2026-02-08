import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import confetti from 'canvas-confetti';
import { saveFeedback } from '../utils/feedbackStorage';

const ValentinePage = ({ onYesClick, isNested = false }) => {
  const [noClicks, setNoClicks] = useState(0);
  const [displayedGifs, setDisplayedGifs] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const maxGifs = 10; // You have 10 files (gif1 through gif10)

  // List of actual files you have (based on what's in /public/gif/)
  // Format: { number: ['ext1', 'ext2', ...] }
  const availableFiles = {
    1: ['gif'],
    2: ['jpg'],
    3: ['jpg'],
    4: ['jpg'],
    5: ['jpg'],
    6: ['jpg'],
    7: ['gif'],
    8: ['gif'],
    9: ['gif'],
    10: ['gif'],
  };

  // Get GIF/image path in order (gif1, gif2, gif3, etc.)
  const getGifInOrder = (clickNumber) => {
    // clickNumber is 1-indexed (first click = 1, second click = 2, etc.)
    const gifNumber = ((clickNumber - 1) % maxGifs) + 1; // Cycle through 1-10
    const extensions = availableFiles[gifNumber] || ['gif', 'jpg']; // Fallback to gif or jpg
    const ext = extensions[0]; // Use the first (and likely only) extension for each file
    return `/gif/gif${gifNumber}.${ext}`;
  };

  // Generate random position for GIF/image with better scattering
  const getRandomPosition = () => {
    // Better distribution: avoid center area where buttons are
    // Create zones: top-left, top-right, bottom-left, bottom-right
    const zone = Math.floor(Math.random() * 4);
    let top, left;
    
    switch(zone) {
      case 0: // Top-left
        top = `${Math.random() * 30 + 5}%`;
        left = `${Math.random() * 40 + 5}%`;
        break;
      case 1: // Top-right
        top = `${Math.random() * 30 + 5}%`;
        left = `${Math.random() * 40 + 55}%`;
        break;
      case 2: // Bottom-left
        top = `${Math.random() * 25 + 50}%`;
        left = `${Math.random() * 40 + 5}%`;
        break;
      case 3: // Bottom-right
        top = `${Math.random() * 25 + 50}%`;
        left = `${Math.random() * 40 + 55}%`;
        break;
      default:
        top = `${Math.random() * 70 + 5}%`;
        left = `${Math.random() * 80 + 5}%`;
    }
    
    return {
      top,
      left,
      rotation: (Math.random() - 0.5) * 40, // Random rotation between -20 and 20 degrees for more variety
      scale: 0.8 + Math.random() * 0.4, // Random scale between 0.8 and 1.2 for variety
    };
  };

  const handleYesClick = () => {
    // Create multiple confetti bursts
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#F8D7DA', '#F5C6CB', '#C41E3A', '#8B0000', '#FFFFFF'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    // Additional burst from center
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors,
      });
    }, 500);

    // Open feedback dropdown
    setShowFeedback(true);

    if (onYesClick) {
      onYesClick();
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim() || isSendingFeedback) return;

    setIsSendingFeedback(true);
    
    try {
      // Save feedback (uses API if available, falls back to localStorage)
      await saveFeedback(feedback);
      
      setIsSendingFeedback(false);
      setFeedbackSubmitted(true);
      setTimeout(() => {
        setShowFeedback(false);
        setFeedback('');
        setFeedbackSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to save feedback:', error);
      setIsSendingFeedback(false);
      // Still show success to user
      setFeedbackSubmitted(true);
      setTimeout(() => {
        setShowFeedback(false);
        setFeedback('');
        setFeedbackSubmitted(false);
      }, 3000);
    }
  };

  const handleCloseFeedback = () => {
    setShowFeedback(false);
    setFeedback('');
    setFeedbackSubmitted(false);
  };

  const handleNoClick = () => {
    if (noClicks < maxGifs) {
      const newGif = {
        id: Date.now() + Math.random(),
        src: getGifInOrder(noClicks + 1), // Use sequential order based on click count
        position: getRandomPosition(),
      };
      setDisplayedGifs((prev) => [...prev, newGif]);
      setNoClicks((prev) => prev + 1);
    }
  };

  const containerClass = isNested 
    ? "w-full h-full paper-texture bg-gradient-to-br from-romantic-pink-light via-romantic-cream-light to-romantic-pink flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden"
    : "absolute w-full h-full page-3d";

  const contentClass = isNested
    ? "w-full h-full relative"
    : "absolute w-full h-full page-backface rounded-lg shadow-2xl overflow-hidden paper-texture bg-gradient-to-br from-romantic-pink-light via-romantic-cream-light to-romantic-pink flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative";

  return (
    <motion.div
      className={containerClass}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={contentClass + (isNested ? "" : "")}>
        {/* Display accumulated GIFs/images scattered */}
        <AnimatePresence>
          {displayedGifs.map((gif) => (
            <motion.div
              key={gif.id}
              className="absolute z-10 pointer-events-none"
              style={{
                top: gif.position.top,
                left: gif.position.left,
              }}
              initial={{ opacity: 0, scale: 0, rotate: -20 }}
              animate={{ 
                opacity: 1, 
                scale: gif.position.scale || 1, 
                rotate: gif.position.rotation || 0,
              }}
              exit={{ opacity: 0, scale: 0, rotate: 20 }}
              transition={{ 
                duration: 0.6,
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
            >
              <img
                src={gif.src}
                alt="Funny GIF or Image"
                className="rounded-lg shadow-2xl border-4 border-white"
                style={{ 
                  width: 'clamp(80px, 12vw, 200px)',
                  height: 'auto',
                  maxWidth: '200px',
                  display: 'block'
                }}
                onError={(e) => {
                  // Try alternative extensions if the file doesn't exist
                  const currentSrc = e.target.src;
                  const basePath = currentSrc.substring(0, currentSrc.lastIndexOf('.'));
                  const extensions = ['gif', 'jpg', 'jpeg', 'png', 'webp'];
                  const currentExt = currentSrc.split('.').pop();
                  const extIndex = extensions.indexOf(currentExt);
                  
                  if (extIndex < extensions.length - 1) {
                    // Try next extension
                    e.target.src = `${basePath}.${extensions[extIndex + 1]}`;
                  } else {
                    // Hide if no extension works
                    e.target.style.display = 'none';
                  }
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Main content */}
        <motion.div
          className="text-center z-20 relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h1 className="font-dancing text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-romantic-red-dark mb-6 sm:mb-8 md:mb-10 lg:mb-12 px-4">
            Will you be my Valentine?
          </h1>
          
          <div className="flex gap-4 sm:gap-6 md:gap-8 justify-center items-center flex-wrap">
            <motion.button
              onClick={handleYesClick}
              className="px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 bg-romantic-red text-white font-inter text-lg sm:text-xl md:text-2xl rounded-full shadow-lg hover:bg-romantic-red-dark transition-colors duration-300 z-30 relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Yes! 💕
            </motion.button>

            {/* No button - disappears after maxGifs clicks */}
            {noClicks < maxGifs && (
              <motion.button
                onClick={handleNoClick}
                className="px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 bg-gray-400 text-white font-inter text-lg sm:text-xl md:text-2xl rounded-full shadow-lg hover:bg-gray-500 transition-colors duration-300 z-30 relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 1 }}
                animate={{ opacity: noClicks >= maxGifs ? 0 : 1 }}
              >
                No
              </motion.button>
            )}
          </div>

          {/* Show message when No button disappears */}
          {noClicks >= maxGifs && (
            <motion.p
              className="mt-4 font-dancing text-xl sm:text-2xl md:text-3xl text-romantic-red-dark"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              I think you should wear your specs girlypop! 😊
            </motion.p>
          )}
        </motion.div>

        {/* Feedback Dropdown */}
        <AnimatePresence>
          {showFeedback && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/50 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseFeedback}
              />
              
              {/* Feedback Form */}
              <motion.div
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 max-w-md w-full mx-4"
                initial={{ opacity: 0, scale: 0.8, y: -50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -50 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {feedbackSubmitted ? (
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="text-6xl mb-4">💕</div>
                    <h3 className="font-dancing text-2xl sm:text-3xl text-romantic-red-dark mb-2">
                      Thank you!
                    </h3>
                    <p className="font-inter text-romantic-red/70">
                      Your feedback has been received!
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="font-dancing text-2xl sm:text-3xl text-romantic-red-dark">
                        Share your thoughts 💕
                      </h2>
                      <button
                        onClick={handleCloseFeedback}
                        className="text-gray-400 hover:text-romantic-red transition-colors text-2xl"
                      >
                        ×
                      </button>
                    </div>
                    
                    <form onSubmit={handleFeedbackSubmit}>
                      <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Write your feedback here..."
                        className="w-full h-32 sm:h-40 p-4 border-2 border-romantic-pink rounded-lg focus:outline-none focus:border-romantic-red font-inter text-sm sm:text-base resize-none"
                        autoFocus
                      />
                      
                      <div className="flex gap-3 mt-4">
                        <motion.button
                          type="submit"
                          disabled={!feedback.trim() || isSendingFeedback}
                          className="flex-1 px-6 py-3 bg-romantic-red text-white font-inter rounded-lg shadow-lg hover:bg-romantic-red-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          whileHover={feedback.trim() && !isSendingFeedback ? { scale: 1.02 } : {}}
                          whileTap={feedback.trim() && !isSendingFeedback ? { scale: 0.98 } : {}}
                        >
                          {isSendingFeedback ? (
                            <>
                              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Sending...
                            </>
                          ) : (
                            'Send'
                          )}
                        </motion.button>
                        <motion.button
                          type="button"
                          onClick={handleCloseFeedback}
                          className="px-6 py-3 bg-gray-200 text-gray-700 font-inter rounded-lg hover:bg-gray-300 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Cancel
                        </motion.button>
                      </div>
                    </form>
                  </>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ValentinePage;
