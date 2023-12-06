export default function Stats({ items }) {
  if (items.length === 0) {
    return (
      <footer className="stats">
        <em>Start adding your list now 🎈</em>
      </footer>
    );
  }
  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentage =
    totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You are ready to go! 🥳"
          : `You have ${totalItems} items on your list, and you already packed ${packedItems}
        (${percentage}%) of them! 💼`}
      </em>
    </footer>
  );
}
