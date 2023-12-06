export default function Item({ item, onDeleteItems, togglePackedItems }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => togglePackedItems(item.id)}
      ></input>
      <span
        style={
          item.packed
            ? { textDecoration: "line-through" }
            : { textDecoration: "none" }
        }
      >
        {item.quantity}. {item.description}
      </span>
      <button className="" onClick={() => onDeleteItems(item.id)}>
        ❌
      </button>
    </li>
  );
}
