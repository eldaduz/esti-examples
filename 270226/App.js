/*
========================================================
Interview-style Tricky React State Questions
(NO ANSWERS)
========================================================
*/

/*
1️⃣ What will be the final value of count after clicking once?
*/
function Question1() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    setCount(count + 1);
  }

  return <button onClick={handleClick}>{count}</button>;
}

/*
2️⃣ Fix the logic so that count increases by 2.
(Rewrite only handleClick)
*/
function Question2() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    setCount(count + 1);
  }

  return <button onClick={handleClick}>{count}</button>;
}

/*
3️⃣ What is wrong in this code?
Why might React not re-render?
*/
function Question3() {
  const [items, setItems] = useState([1, 2, 3]);

  function addItem() {
    items.push(4);
    setItems(items);
  }

  return <button onClick={addItem}>Add</button>;
}

/*
4️⃣ Update only the object with id === 2
without mutating state.
*/
function Question4() {
  const [todos, setTodos] = useState([
    { id: 1, done: false },
    { id: 2, done: false },
  ]);

  function markDone() {
    // Write correct update here
  }

  return <button onClick={markDone}>Mark id 2 as done</button>;
}

/*
5️⃣ What is the potential problem with using index as key?
Explain what could go wrong.
*/
function Question5({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item.name}</li>
      ))}
    </ul>
  );
}

/*
6️⃣ Will this cause an infinite loop?
Explain why or why not.
*/
function Question6() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1);
  }, [count]);

  return <div>{count}</div>;
}

/*
7️⃣ What is the difference between these two updates?
When would each one be safer?
*/
function Question7() {
  const [user, setUser] = useState({
    name: "Dana",
    age: 20,
  });

  function updateA() {
    setUser({ ...user, age: user.age + 1 });
  }

  function updateB() {
    setUser((prev) => ({
      ...prev,
      age: prev.age + 1,
    }));
  }

  return (
    <>
      <button onClick={updateA}>Update A</button>
      <button onClick={updateB}>Update B</button>
    </>
  );
}

/*
8️⃣ Why might this array update be unsafe?
Rewrite it using a safer pattern.
*/
function Question8() {
  const [items, setItems] = useState([]);

  function addItem() {
    setItems([...items, Date.now()]);
  }

  return <button onClick={addItem}>Add</button>;
}

export function App() {
  return <div></div>;
}
