import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]); //lifting the state up to the nearest parent component so that it can be used on another component

  function addItems(item) {
    setItems((items) => [...items, item]); //adding the new item without mutating the items list
  }

  function handleRemoveItem(id) {
    //lifting the state up (We can pass it as a props to the child component)
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handlePackedItems(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={addItems} />
      <PackingList
        items={items}
        onDeleteItems={handleRemoveItem}
        togglePackedItems={handlePackedItems}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1> 🌴 Far Away 🥥</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("Item");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();

    if (description === "") return;

    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItems(newItem); //function taken as a prop from the parrent component
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip? 😍</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map(
          (
            num //for generating the  numbers from 1 to 20
          ) => (
            <option vlaue={num} key={num}>
              {num}
            </option>
          )
        )}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItems, togglePackedItems }) {
  return (
    <div className="list">
      {
        <ul>
          {items.map((item) => (
            <Item
              item={item}
              onDeleteItems={onDeleteItems}
              key={item.id}
              togglePackedItems={togglePackedItems}
            />
          ))}
        </ul>
      }
    </div>
  );
}

function Item({ item, onDeleteItems, togglePackedItems }) {
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

function Stats({ items }) {
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
