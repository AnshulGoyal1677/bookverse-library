
function CategoryFilter({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <div className="category-container">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;