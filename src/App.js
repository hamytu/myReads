import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import BookList from './BookList';
import SearchBook from './Search';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/search" element={<SearchBook />} />
      </Routes>
    </Router>
  );
}

export default App;