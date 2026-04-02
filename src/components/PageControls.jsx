import { motion } from 'framer-motion';

const PageControls = ({ onNext, onPrevious, canGoNext, canGoPrevious }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 shadow-lg w-full">
        <motion.button
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className={[
            'h-14 sm:h-16 font-inter text-sm sm:text-base md:text-lg text-center',
            'rounded-none border-0',
            'border-r border-romantic-red/20',
            'transition-colors duration-300',
            canGoPrevious
              ? 'bg-romantic-pink text-romantic-red-dark hover:bg-romantic-pink-light cursor-pointer'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed opacity-60',
          ].join(' ')}
          whileHover={canGoPrevious ? { scale: 1.02 } : {}}
          whileTap={canGoPrevious ? { scale: 0.98 } : {}}
        >
          <span className="inline-flex items-center justify-center gap-2 w-full">
            <span aria-hidden="true">←</span>
            <span className="hidden sm:inline">Previous</span>
          </span>
        </motion.button>

        <motion.button
          onClick={onNext}
          disabled={!canGoNext}
          className={[
            'h-14 sm:h-16 font-inter text-sm sm:text-base md:text-lg text-center',
            'rounded-none border-0',
            'transition-colors duration-300',
            canGoNext
              ? 'bg-romantic-pink-light text-romantic-red-dark hover:bg-romantic-pink cursor-pointer'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed opacity-60',
          ].join(' ')}
          whileHover={canGoNext ? { scale: 1.02 } : {}}
          whileTap={canGoNext ? { scale: 0.98 } : {}}
        >
          <span className="inline-flex items-center justify-center gap-2 w-full">
            <span aria-hidden="true">Next</span>
            <span aria-hidden="true">→</span>
          </span>
        </motion.button>
      </div>
    </div>
  );
};

export default PageControls;
