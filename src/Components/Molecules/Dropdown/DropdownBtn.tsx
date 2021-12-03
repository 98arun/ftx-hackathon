import { useState } from "react";

function Dropdown() {
  const [input, setInput] = useState("");
  const list = ["first", "second", "third", "fourth"];
  const listName = list.map((name, index) => (
    <option key={index}>{name}</option>
  ));

  return (
    <>
      <div className="Dropdown">
        <select
          name="input"
          value={input}
          onChange={(data) => {
            console.log(data.target.value);
            setInput(data.target.value);
          }}
        >
          {listName}
        </select>
      </div>
    </>
  );
}

export default Dropdown;
