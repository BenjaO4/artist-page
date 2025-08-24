const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());

// Temporär "databas"
let users = [];

// Endpoints
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: "Användarnamn redan taget" });
  }
  const user = { id: users.length + 1, username, password };
  users.push(user);
  res.json({ message: "Registrering lyckad!", userId: user.id });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(400).json({ message: "Fel användarnamn eller lösenord" });
  res.json({ message: "Inloggning lyckad!", userId: user.id });
});

// Servera statiska filer från mappen "public"
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log(`Servern körs på http://localhost:${PORT}`));
