import React from 'react';

function CategoryFilter({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <div style={styles.container}>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          style={{
            ...styles.button,
            ...(selectedCategory === category ? styles.activeButton : {})
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    flexWrap: 'wrap',
    marginBottom: '24px'
  },
  button: {
    padding: '8px 16px',
    borderRadius: '20px',
    border: '1px solid #cbd5e0',
    backgroundColor: '#ffffff',
    color: '#4a5568',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  },
  activeButton: {
    backgroundColor: '#3182ce',
    color: '#ffffff',
    borderColor: '#3182ce'
  }
};

export default CategoryFilter;