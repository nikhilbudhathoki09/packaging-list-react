import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import Stats from "./Stats";
import PackingList from "./PackingList";

export default function App() {
  const [items, setItems] = useState([]); //lifting the state up to the nearest parent component so that it can be used on another component

  function addItems(item) {
    setItems((items) => [...items, item]); //adding the new item without mutating the items list
  }

  function handleRemoveItem(id) {
    //lifting the state up (We can pass it as a props to the child component)
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleRemoveAll() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all the items?"
    );
    if (confirmed) setItems([]);
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
        removeAll={handleRemoveAll}
      />
      <Stats items={items} />
    </div>
  );
}
