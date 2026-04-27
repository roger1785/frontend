import CategoryCard from "./CategoryCard";

function CategoryList({ categories }) {
  return (
    <div>
      <h2>Categorías</h2>
      <ul>
        {categories.map((category) => (
          <CategoryCard 
          key={category.id} 
          category={category} />
        ))}
      </ul>
    </div>
  );
}
export default CategoryList;