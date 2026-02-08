import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Book from './components/Book';
import FeedbackPage from './pages/FeedbackPage';
import { pagesData } from './data/pagesData';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="w-screen h-screen overflow-hidden">
              <Book pagesData={pagesData} />
            </div>
          }
        />
        <Route path="/feedback" element={<FeedbackPage />} />
      </Routes>
    </Router>
  );
}

export default App;
