function CategoryBlogs({ id = "", name = "" }) {
  return (
    <option className={id.toString()} value={id}>
      {name}
    </option>
  );
}

export default function RenderCategoryBlogs({ categories = [] }) {
  return categories.map((category, index) => {
    return (
      <CategoryBlogs key={category.id} id={category.id} name={category.name} />
    );
  });
}
