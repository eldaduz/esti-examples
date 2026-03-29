import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  async function fetchUsers() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/users", {
        headers: {
          authorization: "secret123",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users"); //{message:"Failed to fetch users", type: ... }
      }
      const data = await response.json(); //{users: [...]}
      setUsers(data.users);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteUser(id) {
    setError(null);

    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
        headers: {
          authorization: "secret123",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Failed to delete user ${id}`); //{message:"Failed to fetch users", type: ... }
      }

      if (selectedUser.id === id) {
        setSelectedUser(null);
      }

      // APPROUCE 1: update the user state locally
      // const usersAfterDelete = users.filter((user) => user.id !== id);
      // setUsers(usersAfterDelete);

      //APPROUCE 2: fetch all users from server
      fetchUsers();

      //APPROUCE 3: get the updated users from the delete response
      // setUsers(data.updatedUsers);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    //fetch users from server
    fetchUsers();
  }, []);

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>{error || "Something went wrong"}</div>}
      {!loading && users.length === 0 && <div>No items</div>}
      {!loading && users.length > 0 && (
        <div>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <span onClick={() => setSelectedUser(user)}>{user.name}</span>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </li>
            ))}
          </ul>
          {selectedUser && (
            <div>
              <h2>Selected User:</h2>
              <p>ID: {selectedUser.id}</p>
              <p>NAME: {selectedUser.name}</p>
              <p>AGE: {selectedUser.age}</p>
              <p>COLOR: {selectedUser.color}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;
