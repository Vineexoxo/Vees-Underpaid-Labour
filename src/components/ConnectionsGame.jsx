import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const ConnectionsGame = ({ gameData }) => {
  const [selectedWords, setSelectedWords] = useState([]);
  const [solvedGroups, setSolvedGroups] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const maxMistakes = 4;

  // Flatten all words from groups
  const allWords = gameData.groups.flatMap(group => group.words);
  
  // Shuffle words for display
  const [shuffledWords, setShuffledWords] = useState(() => {
    return [...allWords].sort(() => Math.random() - 0.5);
  });

  const handleWordClick = (word) => {
    if (solvedGroups.some(group => group.words.includes(word))) {
      return; // Word already solved
    }

    if (selectedWords.includes(word)) {
      // Deselect word
      setSelectedWords(selectedWords.filter(w => w !== word));
    } else if (selectedWords.length < 4) {
      // Select word
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleSubmit = () => {
    if (selectedWords.length !== 4) return;

    // Check if selected words form a valid group
    const foundGroup = gameData.groups.find(group => {
      const groupWords = new Set(group.words);
      return selectedWords.every(word => groupWords.has(word));
    });

    if (foundGroup && !solvedGroups.find(g => g.category === foundGroup.category)) {
      // Correct group!
      setSolvedGroups([...solvedGroups, foundGroup]);
      setSelectedWords([]);
      
      // Remove solved words from shuffled list
      setShuffledWords(shuffledWords.filter(word => !foundGroup.words.includes(word)));
    } else {
      // Wrong group - increment mistakes
      setMistakes(mistakes + 1);
      setSelectedWords([]);
      
      if (mistakes + 1 >= maxMistakes) {
        // Game over - show solution
        setTimeout(() => {
          setShowSolution(true);
        }, 500);
      }
    }
  };

  const handleDeselect = () => {
    setSelectedWords([]);
  };

  const getWordColor = (word) => {
    const solvedGroup = solvedGroups.find(group => group.words.includes(word));
    if (solvedGroup) {
      const groupIndex = gameData.groups.findIndex(g => g.category === solvedGroup.category);
      const colors = ['bg-yellow-200', 'bg-green-200', 'bg-blue-200', 'bg-purple-200'];
      return colors[groupIndex % 4];
    }
    return selectedWords.includes(word) ? 'bg-romantic-pink' : 'bg-white';
  };

  const getGroupColor = (index) => {
    const colors = ['bg-yellow-200', 'bg-green-200', 'bg-blue-200', 'bg-purple-200'];
    return colors[index % 4];
  };

  const isGameComplete = solvedGroups.length === gameData.groups.length;

  // Celebration when game is completed
  useEffect(() => {
    if (isGameComplete) {
      // Create multiple confetti bursts
      const duration = 5000;
      const end = Date.now() + duration;

      const colors = ['#F8D7DA', '#F5C6CB', '#C41E3A', '#8B0000', '#FFFFFF', '#FFF8E7'];

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());

      // Multiple bursts from center
      setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.5 },
          colors: colors,
        });
      }, 300);
      
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 60,
          origin: { y: 0.6 },
          colors: colors,
        });
      }, 800);
    }
  }, [isGameComplete]);

  return (
    <div className={`w-full h-full paper-texture ${gameData.backgroundColor} p-4 sm:p-6 md:p-8 lg:p-12 overflow-y-auto`}>
      {/* Title */}
      <motion.div
        className="text-center mb-6 sm:mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-dancing text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-romantic-red-dark mb-2">
          Connections
        </h1>
        <p className="font-inter text-sm sm:text-base text-romantic-red/70">
          Find groups of four that share a common thread
        </p>
      </motion.div>

      {/* Mistakes counter */}
      <div className="flex justify-center gap-2 mb-4 sm:mb-6">
        {[...Array(maxMistakes)].map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i < mistakes ? 'bg-romantic-red' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 max-w-4xl mx-auto">
        {shuffledWords.map((word, index) => {
          const isSelected = selectedWords.includes(word);
          const isSolved = solvedGroups.some(group => group.words.includes(word));
          
          return (
            <motion.button
              key={`${word}-${index}`}
              onClick={() => handleWordClick(word)}
              disabled={isSolved || showSolution}
              className={`
                px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 
                rounded-lg shadow-md 
                font-inter text-xs sm:text-sm md:text-base lg:text-lg
                transition-all duration-200
                ${getWordColor(word)}
                ${isSelected ? 'ring-4 ring-romantic-red scale-105' : ''}
                ${isSolved ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
                ${showSolution ? 'cursor-default' : ''}
              `}
              whileHover={!isSolved && !showSolution ? { scale: 1.05 } : {}}
              whileTap={!isSolved && !showSolution ? { scale: 0.95 } : {}}
            >
              {word}
            </motion.button>
          );
        })}
      </div>

      {/* Selected words and submit */}
      {selectedWords.length > 0 && !showSolution && (
        <motion.div
          className="flex flex-col items-center gap-4 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex gap-2 flex-wrap justify-center">
            {selectedWords.map((word) => (
              <span
                key={word}
                className="px-4 py-2 bg-romantic-pink text-romantic-red-dark rounded-lg font-inter text-sm md:text-base"
              >
                {word}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-romantic-red text-white rounded-lg font-inter hover:bg-romantic-red-dark transition-colors"
            >
              Submit
            </button>
            <button
              onClick={handleDeselect}
              className="px-6 py-2 bg-gray-400 text-white rounded-lg font-inter hover:bg-gray-500 transition-colors"
            >
              Deselect
            </button>
          </div>
        </motion.div>
      )}

      {/* Solved Groups */}
      {solvedGroups.length > 0 && (
        <motion.div
          className="mb-6 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="font-dancing text-2xl sm:text-3xl text-romantic-red-dark mb-4 text-center">
            Solved Groups
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {solvedGroups.map((group, index) => (
              <motion.div
                key={group.category}
                className={`${getGroupColor(index)} p-4 rounded-lg shadow-md`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="font-inter font-bold text-lg mb-2 text-gray-800">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.words.map((word) => (
                    <span
                      key={word}
                      className="px-2 py-1 bg-white/80 rounded text-sm"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Solution (when game over or completed) */}
      {(showSolution || isGameComplete) && (
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.h2 
            className="font-dancing text-3xl sm:text-4xl md:text-5xl text-romantic-red-dark mb-4 text-center"
            animate={isGameComplete ? {
              scale: [1, 1.1, 1],
            } : {}}
            transition={{ duration: 0.5, repeat: isGameComplete ? Infinity : 0, repeatDelay: 1 }}
          >
            {isGameComplete ? '🎉 Congratulations! 🎉 You really are quite smart!' : 'Solution'}
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {gameData.groups.map((group, index) => (
              <motion.div
                key={group.category}
                className={`${getGroupColor(index)} p-4 rounded-lg shadow-md`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="font-inter font-bold text-lg mb-2 text-gray-800">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.words.map((word) => (
                    <span
                      key={word}
                      className="px-2 py-1 bg-white/80 rounded text-sm"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

    </div>
  );
};

export default ConnectionsGame;
