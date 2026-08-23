import React from 'react'
import BookGrid from './components/BookGrid';
import { books } from './data/books';

function App() {
  return (
    <div style={{ padding: '32px', backgroundColor: '#f7fafc', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '24px', color: '#2d3748' }}>BookVerse Catalogue</h1>
      <BookGrid books={books} />
    </div>
  );
}

export default App;
