import { useState } from "react";
import { addTopic } from "./services";

export default function CreateTopic() {
  const [text, setText] = useState('');

  const handleAddTopic = async () => {
    if (text.trim() === '') {
      alert('Topic title cannot be empty')
      return;
    }

    addTopic(text);
  }

  return (
    <div className="flex justify-end">
      <h1>CREATE A TOPIC BITCH</h1>
      <input type="text" placeholder="Add new topic..." value={text} onChange={(e) => setText(e.target.value)}/>
      <button onClick={handleAddTopic}>Add</button>
    </div>
  );
}
