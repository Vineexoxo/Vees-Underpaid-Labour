import { motion } from 'framer-motion';

const PageControls = ({ onNext, onPrevious, canGoNext, canGoPrevious }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center w-full">
      <motion.button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={`w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 font-inter text-base sm:text-lg md:text-xl rounded-full shadow-lg transition-all duration-300 ${
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
        className={`w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 font-inter text-base sm:text-lg md:text-xl rounded-full shadow-lg transition-all duration-300 ${
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
