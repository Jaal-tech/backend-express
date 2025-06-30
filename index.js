const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const defineUser = require('./models/user');
const app = express();
require('dotenv').config();

app.use(express.json());

const sequelize = new Sequelize('docker', 'root', process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: 3306,
  logging: console.log,  // optional, to see SQL logs
});
const User = defineUser(sequelize, DataTypes);
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Sequelize connected successfully!');
  } catch (error) {
    console.error('Sequelize connection error:', error);
  }
})();


app.get("/users", async (req, res) => {
  try {
    console.log('HERHEHREHRHERH')
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.post("/users", async (req, res) => {
  try {
    const user = await User.create({ name: req.body.name });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const result = await User.destroy({ where: { id: req.params.id } });
    if (result) res.json({ message: "User deleted" });
    else res.status(404).json({ error: "User not found" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

const PORT = 3000;
sequelize.authenticate().then(() => {
  console.log("Database connected!");
  app.listen(PORT,'0.0.0.0' ,() => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error("Unable to connect to DB:", err);
});
