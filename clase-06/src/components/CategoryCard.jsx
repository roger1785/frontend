function CategoryCard({ category }) {
  const { name } = category;
  return (
    <li>
      <h3>{name}</h3>
    </li>
  );
}   

export default CategoryCard;