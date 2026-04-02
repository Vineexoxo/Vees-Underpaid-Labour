import { useState } from 'react';
import Page from './Page';
import PageControls from './PageControls';

const Book = ({ pagesData }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState('forward');

  const totalPages = pagesData.length;

  const handleNext = () => {
    if (isFlipping || currentPageIndex >= totalPages - 1) return;
    
    setIsFlipping(true);
    setFlipDirection('forward');
    
    setTimeout(() => {
      setCurrentPageIndex((prev) => prev + 1);
      setIsFlipping(false);
    }, 600); // Half of animation duration
  };

  const handlePrevious = () => {
    if (isFlipping || currentPageIndex <= 0) return;
    
    setIsFlipping(true);
    setFlipDirection('backward');
    
    setTimeout(() => {
      setCurrentPageIndex((prev) => prev - 1);
      setIsFlipping(false);
    }, 600);
  };

  return (
    <div className="w-full h-screen overflow-hidden relative overflow-x-hidden">
      <div className="book-perspective w-full h-full">
        <div className="relative w-full h-full">
          {pagesData.map((page, index) => {
            const isCurrentPage = index === currentPageIndex;
            const isNextPage = index === currentPageIndex + 1 && flipDirection === 'forward' && isFlipping;
            const isPreviousPage = index === currentPageIndex - 1 && flipDirection === 'backward' && isFlipping;
            const isLastPage = index === totalPages - 1;
            
            // Only render current page and the page being flipped to
            if (!isCurrentPage && !isNextPage && !isPreviousPage) return null;
            
            // Determine z-index and flip state
            let zIndex, isFlipped, initialRotation;
            if (isFlipping) {
              if (flipDirection === 'forward') {
                // Current page flips out (0→180), next page flips in (180→0)
                if (isCurrentPage) {
                  zIndex = 20;
                  isFlipped = true; // Flips out
                  initialRotation = 0;
                } else if (isNextPage) {
                  zIndex = 21;
                  isFlipped = false; // Flips in
                  initialRotation = 180; // Starts flipped, then rotates to 0
                }
              } else {
                // Backward: current flips out (0→180), previous flips in (180→0)
                if (isCurrentPage) {
                  zIndex = 20;
                  isFlipped = true; // Flips out
                  initialRotation = 0;
                } else if (isPreviousPage) {
                  zIndex = 21;
                  isFlipped = false; // Flips in
                  initialRotation = 180; // Starts flipped, then rotates to 0
                }
              }
            } else {
              // Normal state - current page is visible
              zIndex = isCurrentPage ? 10 : 5;
              isFlipped = false;
              initialRotation = 0;
            }
            
            return (
              <Page
                key={page.id}
                pageData={page}
                zIndex={zIndex}
                isFlipped={isFlipped}
                initialRotation={initialRotation}
                isFlipping={isFlipping && (isCurrentPage || isNextPage || isPreviousPage)}
                showValentineOnBack={isLastPage}
                isCurrentPage={isCurrentPage}
              />
            );
          })}
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[calc(env(safe-area-inset-bottom)+0.5rem)] sm:bottom-8 z-50 px-4 w-full flex justify-center">
        <PageControls
          onNext={handleNext}
          onPrevious={handlePrevious}
          canGoNext={currentPageIndex < totalPages -1 && !isFlipping}
          canGoPrevious={currentPageIndex > 0 && !isFlipping}
        />
      </div>
    </div>
  );
};

export default Book;
