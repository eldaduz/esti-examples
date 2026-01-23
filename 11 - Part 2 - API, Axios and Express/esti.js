import axios from "axios";

async function getTodo() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos/1",
    );
    console.log("Data received:", response.data);
    return response.data;
    
  } catch (error) {
    console.log("Error:", error.message);
  }
}

const todos = getTodo();
todos.forEach(todo => console.log('todo:', todo));


async function getTodo() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1",
    );
    console.log("response:", response);
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("error", error);
  }
}

getTodo();

// import axios from "axios";

// async function getTodo() {
//   const response = await axios.get(
//     "https://jsonplaceholder.typicode.com/todos/1",
//   );
//   console.log("response:", response);

//   console.log(response.data);
// }

// getTodo();
