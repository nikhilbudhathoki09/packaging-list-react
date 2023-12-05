import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 2, packed: true },
];

export default function App() {
  const [items, setItems] = useState([]); //lifting the state up to the nearest parent component so that it can be used on another component

  function addItems(item) {
    setItems((items) => [...items, item]); //adding the new item without mutating the items list
  }

  function handleRemoveItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={addItems} />
      <PackingList items={items} onDeleteItems={handleRemoveItem} />
      <Stats />
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
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option vlaue={num} key={num}>
            {num}
          </option>
        ))}
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

function PackingList({ items, onDeleteItems }) {
  return (
    <div className="list">
      {
        <ul>
          {items.map((item) => (
            <Item item={item} onDeleteItems={onDeleteItems} key={item.id} />
          ))}
        </ul>
      }
    </div>
  );
}

function Item({ item, onDeleteItems }) {
  return (
    <li>
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

function Stats() {
  return (
    <footer className="stats">
      <em> You have X items on your list, and you already packed X(X%)</em>
    </footer>
  );
}
