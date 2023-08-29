const express = require("express");
const loanRoutes = require("./routes/LoanRoutes");
const dbConfig = require("./dbConfig");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.json({ users: ["userOne"] });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.use(loanRoutes);
