const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => {
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const obData = JSON.parse(data);
  res.status(200).json({ users: obData.employees });
});

app.post("/users", (req, res) => {
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const { employees } = JSON.parse(data);
  const newUser = {
    eid: `${employees.length + 1}`,
    ...req.body,
  };
  employees.push(newUser);
  fs.writeFileSync("./users.json", JSON.stringify({ employees }));
  res.status(201).json({ user: newUser });
});

app.put("/users/:userId", (req, res) => {
  console.log(req.params);
  console.log(req.body);
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const { users } = JSON.parse(data);
  const findIndex = users.findIndex(
    (user) => user.id === parseInt(req.params.userId)
  );

  if (findIndex > -1) {
    users[findIndex].name = req.body.name;
    fs.readFileSync("./users.json", JSON.stringify({ users }));
    res.status(200).json({ user: users[findIndex], date: "" });
  } else {
    res.status(400).json({ message: "Not found user id " });
  }
});

app.delete("/users/:id", (req, res) => {
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const { employees } = JSON.parse(data);
  const findIndex = employees.findIndex((user) => user.ied === req.params.id);

  if (findIndex > -1) {
    const deletedUser = employees.splice(findIndex, 1);
    fs.readFileSync("./users.json", JSON.stringify({ employees }));
    res.status(200).json({ user: deletedUser[0] });
  } else {
    res.status(400).json({ message: "Not found user id" });
  }
});

  app.listen(8000, () => {
  console.log("Server is running at localhost:8000");
});
