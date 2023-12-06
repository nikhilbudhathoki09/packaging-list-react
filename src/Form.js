import { useState } from "react";

export default function Form({ onAddItems }) {
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
