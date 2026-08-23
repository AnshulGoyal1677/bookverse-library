import React from 'react';

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Search books by title or author..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.input}
      />
    </div>
  );
}

const styles = {
  container: {
    marginBottom: '24px',
    display: 'flex',
    justifyContent: 'center'
  },
  input: {
    width: '100%',
    maxWidth: '500px',
    padding: '12px 16px',
    fontSize: '16px',
    border: '1px solid #cbd5e0',
    borderRadius: '6px',
    outline: 'none',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  }
};

export default SearchBar;