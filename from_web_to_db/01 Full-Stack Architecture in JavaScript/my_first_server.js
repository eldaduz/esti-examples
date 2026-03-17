import express from "express";
let users = [
  { id: 1, name: "Dana" },
  { id: 2, name: "Noa" },
  { id: 3, name: "Yossi" },
];
const app = express();
app.get("/users", (req, res) => {
  res.status(200).json({ users });
});
app.get("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res
      .status(404)
      .json({ message: `User with id ${userId} not found` });
  }
  res.status(200).json({ user });
});
app.delete("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res
      .status(404)
      .json({ message: `User with id ${userId} not found` });
  }
  users = users.filter((user) => user.id !== userId);
  res.status(200).json({
    message: `User with id ${userId} deleted successfully`,
    deletedUser: user,
    updatedUser: users,
  });
});
app.listen(3000, () => console.log("Server is running on port 3000!!"));
