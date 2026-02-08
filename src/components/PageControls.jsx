import { motion } from 'framer-motion';

const PageControls = ({ onNext, onPrevious, canGoNext, canGoPrevious }) => {
  return (
    <div className="flex gap-4 md:gap-6 justify-center items-center">
      <motion.button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={`px-8 md:px-12 py-4 md:py-5 font-inter text-lg md:text-xl rounded-full shadow-lg transition-all duration-300 ${
          canGoPrevious
            ? 'bg-romantic-red text-white hover:bg-romantic-red-dark cursor-pointer'
            : 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-50'
        }`}
        whileHover={canGoPrevious ? { scale: 1.05 } : {}}
        whileTap={canGoPrevious ? { scale: 0.95 } : {}}
      >
        ← Previous
      </motion.button>

      <motion.button
        onClick={onNext}
        disabled={!canGoNext}
        className={`px-8 md:px-12 py-4 md:py-5 font-inter text-lg md:text-xl rounded-full shadow-lg transition-all duration-300 ${
          canGoNext
            ? 'bg-romantic-red text-white hover:bg-romantic-red-dark cursor-pointer'
            : 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-50'
        }`}
        whileHover={canGoNext ? { scale: 1.05 } : {}}
        whileTap={canGoNext ? { scale: 0.95 } : {}}
      >
        Next →
      </motion.button>
    </div>
  );
};

export default PageControls;
