const express = require("express");

const fs = require("fs");

const app = express();
app.use(express.json());
// const users = [{ id: 1, name: "Naraa", age: "20" }];

app.get("/users", (req, res) => {
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const obData = JSON.parse(data);
  res.status(200).json({ users: obData.users });
});

app.post("/users", (req, res) => {
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const { users } = JSON.parse(data);
  const newUser = {
    id: `${users.lenght + 1}`,
    name: req.body.name,
    age: req.body.age,
  };
  users.push(newUser);
  fs.writeFileSync("./users.json", JSON.stringify({ users }));
  res.status(201).json({ user: newUser });
});

app.put("/users/:userId", (req, res) => {
  console.log(req.params);
  console.log(req.body);
  const findIndex = users.findIndex(
    (user) => user.id === parseInt(req.params.userId)
  );

  if (findIndex > -1) {
    users[findIndex].name = req.body.name;
    res.status(200).json({ user: users[findIndex] });
  } else {
    res.status(400)({ message: "Not found user id " });
  }
});

app.delete("/users/:id", (req, res) => {
  const findIndex = users.findIndex(
    (user) => user.id === parseInt(req.params.id)
  );
  if (findIndex > -1) {
    const deleteUser = users.splice(findIndex, 1);
    res.status(200).json({ user: deleteUser[0] });
  } else {
    res.status(400)({ message: "Not foound user id" });
  }
});

app.listen(8000, () => {
  console.log("Server is running at localhost:8000");
});
