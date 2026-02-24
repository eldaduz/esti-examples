import { useState } from "react";
import "./styles.css";

/*
=========================================
React Practice – Components with map()
(NO answers)
=========================================
*/

/*
Exercise 1 – ProductList

Create a component named ProductList that receives a prop called products
(an array of strings).

The component should render:
- A title: "Products"
- A <ul> list
- Each product should be rendered as an <li> using map()

Example input:
["Milk", "Bread", "Eggs"]

Expected UI (example):
Products
- Milk
- Bread
- Eggs

Notes:
- Use map()
- Add a key for each <li> (you may use index for now)
*/

// //props => {products: ["Milk", "Bread", "Eggs"]}
// function ProductList({ products }) {
//   return (
//     <div>
//       <h2>Products</h2>
//       <ul>
//         {products.map((product, index) => (
//           <li key={index}>{product}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default function App() {
//   return <ProductList products={["Milk", "Bread", "Eggs"]} />;
// }

// export function App2() {
//   return <ProductList products={["Milk", "Bread", "Eggs"]} />;
// }

/*
Exercise 2 – StudentsList (with presence icon)

Create a component named StudentsList that receives a prop called students
(an array of objects).

Each object looks like this:
{ name: "Dana", present: true }

The component should render a <ul> list.
Each student should be rendered as an <li> using map().

Rules:
- If present is true -> show: "✅ " + name
- If present is false -> show: "❌ " + name

Example input:
[
  { name: "Dana", present: true },
  { name: "Noam", present: false },
  { name: "Lior", present: true }
]

Expected UI (example):
✅ Dana
❌ Noam
✅ Lior

Notes:
- Use map()
- Add a key for each <li> (you may use index for now)


function StudentsList({ students }) {
  // const filteredStudents = students.filter((student) => student.age > 22);
  return (
    <ul>
      {students
        .filter((student) => student.age > 22)
        .map((student, index) => {
          const icon = student.present ? `✅` : `❌`;
          return (
            <div key={index}>
              {icon} {student.name}
            </div>
          );
        })}
    </ul>
  );
}

export default function App() {
  const list = [
    { name: "Dana", present: true, age: 50 },
    { name: "Noam", present: false, age: 30 },
    { name: "Lior", present: true, age: 25 },
    { name: "Eyal", present: true, age: 18 },
    { name: "Michal", present: false, age: 20 },
  ];

  return <StudentsList students={list} />;

  import { useState } from "react";


  //================================================
/*
========================================================
React – State updates (immutability) + prev & batching
Practice file
========================================================

What we cover here:
1) Why we NEVER mutate state directly (arrays / objects / nested objects)
2) How to correctly update state (create new references)
3) prev + batching: why state can be "wrong" without prev
4) Additional real-world examples
*/

/*
========================================================
0) distracturing && spread operator
========================================================
*/

const user = { name: "Dana", age: 20 };
const user2 = { ...user, present: true };
const user3 = { ...user2, age: 30 };
console.log("user", user);
console.log("user2", user2);
console.log("user3", user3);

const { name, age } = user;
// console.log(name);
const array = ["Gavi", "Ibal", "Guy"];
const array2 = [...array, "Eran"];
console.log("array1: ", array);
console.log("array2: ", array2);

const [name1, , name3] = array;
console.log("name1:", name1);
console.log("name3:", name3);

export function SpreadExample() {
  const [user, setUser] = useState({
    name: "Dana",
    age: 20,
  });

  const handleClick = () => {
    const newUserWrong = {
      name: user.name,
      age: 20,
    };
    const newUser = { ...user, age: 30 };
    setUser(newUser);
  };

  return <></>;
}

/*

========================================================
1) Array in state – NEVER mutate directly
========================================================
*/

//1001: items ([1, 2, 3]) => [1, 2, 3, 4]
//1002: name
//1003: [...items, 4] => [1, 2, 3, 4]
//1004: {name: "Dana",age: 21}

export function ArrayStateExample() {
  const [items, setItems] = useState([1, 2, 3]);
  const [user, setUser] = useState({
    name: "Dana",
    age: 20,
  });
  const [users, setUsers] = useState([
    { id: 1, name: "Dana", active: false },
    { id: 2, name: "Tom", active: false },
  ]);

  function correctChange() {
    const updatedUsers = users.map((user) =>
      user.id === 2 ? { ...user, active: true } : user
    );
    setUsers(updatedUsers);

    const filteredUsers = users.filter((user) => user.id === 2);
    setUsers(filteredUsers);
  }

  // const [tasks, setTasks] = useState([...])
  // const [currentStatus, setCurrentStatus] = useStatus("All")
  // return <div>
  //   <select onChange={()=>setCurrentStatus()}>dropdown</select>
  //   <div>{tasks.filter((task) => task.status === currentStatus).map(...)}</div>
  //   <div>;

  // ❌ WRONG – mutating the existing array
  function wrongAdd() {
    items.push(4); // same array reference
    setItems(items); // React may not detect a change
  }

  // ✔️ CORRECT – create a new array
  function correctAdd() {
    setItems([...items, 4]);
  }

  // ✔️ CORRECT (recommended) – when update depends on previous state
  function correctAddWithPrev() {
    setItems((prev) => [...prev, 4]);
  }

  return (
    <div style={{ border: "1px solid #ddd", padding: 12, marginBottom: 12 }}>
      <h3>ArrayStateExample</h3>
      <p>Items: {items.join(", ")}</p>
      <button onClick={wrongAdd}>❌ Wrong add (push)</button>{" "}
      <button onClick={correctAdd}>✔️ Correct add (spread)</button>{" "}
      <button onClick={correctAddWithPrev}>✔️ Correct add (prev)</button>
    </div>
  );
}
/*
Why mutation is wrong?

React compares references:
oldArray === newArray

If the reference didn’t change,
React may skip re-rendering.
*/

// /*
// ========================================================
// 2) Object in state – NEVER mutate directly
// ========================================================
// */

export function ObjectStateExample() {
  const [user, setUser] = useState({ name: "Dana", age: 20 });

  // ❌ WRONG – direct mutation
  function wrongUpdateAge() {
    user.age = 21;
    setUser(user); // same object reference
  }

  // ✔️ CORRECT – create a new object
  function correctUpdateAge() {
    setUser({
      ...user,
      age: user.age + 1,
    });
    // setUser({
    //   ...user,
    //   age: user.age + 3,
    // });
  }

  // ✔️ CORRECT (recommended) – when based on previous state
  function correctIncrementAgeWithPrev() {
    setUser((prev) => ({
      ...prev,
      age: prev.age + 1,
    }));
    // setUser((prev) => ({
    //   ...prev,
    //   age: prev.age + 3,
    // }));
  }

  return (
    <div style={{ border: "1px solid #ddd", padding: 12, marginBottom: 12 }}>
      <h3>ObjectStateExample</h3>
      <p>
        Name: {user.name} | Age: {user.age}
      </p>
      <button onClick={wrongUpdateAge}>❌ Wrong update age</button>{" "}
      <button onClick={correctUpdateAge}>✔️ Correct set age to 21</button>{" "}
      <button onClick={correctIncrementAgeWithPrev}>
        ✔️ Correct age++ (prev)
      </button>
    </div>
  );
}

/*
Rule:
In React – do not mutate.
Always create a new object/array.
*/

// /*
// ========================================================
// 3) Updating one object inside an array
// ========================================================
// */

export function UpdateObjectInsideArrayExample() {
  const [users, setUsers] = useState([
    { id: 1, name: "Dana", active: false },
    { id: 2, name: "Tom", active: false },
  ]);

  // ❌ WRONG – mutating nested object
  function wrongActivateTom() {
    const tom = users.find((u) => u.id === 2);
    if (!tom) return;
    tom.active = true; // mutation
    setUsers(users); // same array reference
  }

  // ✔️ CORRECT – map + create new object
  function correctActivateTom() {
    setUsers(users.map((u) => (u.id === 2 ? { ...u, active: !u.active } : u)));
    setUsers(users.map((u) => (u.id === 2 ? { ...u, active: !u.active } : u)));
  }

  // ✔️ CORRECT (recommended)
  function correctToggleTomWithPrev() {
    setUsers((prev) =>
      prev.map((u) => (u.id === 2 ? { ...u, active: !u.active } : u))
    );
    setUsers((prev) =>
      prev.map((u) => (u.id === 2 ? { ...u, active: !u.active } : u))
    );
  }

  return (
    <div style={{ border: "1px solid #ddd", padding: 12, marginBottom: 12 }}>
      <h3>UpdateObjectInsideArrayExample</h3>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} – active: {u.active ? "true" : "false"}
          </li>
        ))}
      </ul>
      <button onClick={wrongActivateTom}>❌ Wrong: activate Tom</button>{" "}
      <button onClick={correctActivateTom}>✔️ Correct: activate Tom</button>{" "}
      <button onClick={correctToggleTomWithPrev}>
        ✔️ Correct: toggle Tom (prev)
      </button>
    </div>
  );
}

// /*
// ========================================================
// 4) prev & batching – why state may be wrong without prev
// ========================================================

// Batching:
// React groups multiple state updates
// into a single re-render for performance.

// Because of batching,
// multiple setState calls may use the same old value.
// */

export function PrevBatchingExample1() {
  const [count, setCount] = useState(0);

  // ❌ WRONG – increases only by 1
  function wrongPlusTwo() {
    setCount(count + 1); //0 + 1
    setCount(count + 1);
  }

  // ✔️ CORRECT – increases by 2
  function correctPlusTwo() {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 3);
    setCount((prev) => prev + 1);
  }

  return (
    <div style={{ border: "1px solid #ddd", padding: 12, marginBottom: 12 }}>
      <h3>PrevBatchingExample1</h3>
      <p>Count: {count}</p>
      <button onClick={wrongPlusTwo}>❌ Wrong +2</button>{" "}
      <button onClick={correctPlusTwo}>✔️ Correct +2 (prev)</button>
    </div>
  );
}

// /*
// Another batching example
// */

export function PrevBatchingExample2() {
  const [count, setCount] = useState(0);

  // ❌ WRONG – likely ends at 5 instead of 6
  function wrongPlus1ThenPlus5() {
    setCount(count + 1);
    setCount(count + 5);
  }

  // ✔️ CORRECT
  function correctPlus1ThenPlus5() {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 5);
  }

  return (
    <div style={{ border: "1px solid #ddd", padding: 12, marginBottom: 12 }}>
      <h3>PrevBatchingExample2</h3>
      <p>Count: {count}</p>
      <button onClick={wrongPlus1ThenPlus5}>❌ Wrong +1 then +5</button>{" "}
      <button onClick={correctPlus1ThenPlus5}>
        ✔️ Correct +1 then +5 (prev)
      </button>
    </div>
  );
}

/*
When should you ALWAYS use prev?

Whenever your update depends on the previous value:

✔️ setCount(prev => prev + 1)
✔️ setItems(prev => [...prev, newItem])
✔️ setUser(prev => ({ ...prev, age: prev.age + 1 }))
*/

// /*
// ========================================================
// Key
// ========================================================
// */

function List() {
  const [items, setItems] = useState([
    { id: 11, name: "Esti" }, //0
    { id: 22, name: "Tom" }, // 1
    { id: 33, name: "Dina" }, //2
  ]);

  function removeFirst() {
    setItems(items.slice(1));
  }

  /*
      <div key={11}>
          <input defaultValue={item.name} /> //Dana
        </div>
         <div key={22}>
          <input defaultValue={item.name} /> //Tom
        </div>
         <div key={33}>
          <input defaultValue={item.name} />
        </div>
  */

  return (
    <>
      {/* currect way: change key={index} to key={item.id} */}
      <button onClick={removeFirst}>Remove first</button>
      {items.map((item, index) => (
        <div key={index}>
          <input defaultValue={item.name} />
        </div>
      ))}
    </>
  );
}

//
// ========================================================
// Main App – renders all examples
// ========================================================

export default function App() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: 16 }}>
      {/* <h2>React State Updates + prev & batching</h2> */}

      {/* <ArrayStateExample /> */}
      {/* <ObjectStateExample /> */}
      {/* <UpdateObjectInsideArrayExample /> */}
      {/* <PrevBatchingExample1 />
      <PrevBatchingExample2 />  */}
      <List />
    </div>
  );
}
