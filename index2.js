const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path"); // Import path module
const app = express();

app.use(express.json());
app.use(cors());

// Use the environment variable for PORT or default to 3001
const PORT = process.env.PORT || 3001;

// Set the path for the data.json file relative to the server root
const FILE_PATH = path.join(__dirname, "data.json");

// Function to generate a unique 4-digit ID
const generateId = () => {
  let id = "";
  while (id.length < 4) {
    id += Math.floor(Math.random() * 10).toString();
  }
  return id;
};

// Read the JSON file and parse it
const readData = () => {
  try {
    const data = fs.readFileSync(FILE_PATH);
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading from file:", error);
    return {};
  }
};

// Write data to the JSON file
const writeData = (data) => {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to file:", error);
  }
};

// API endpoint to save name and email
app.post("/save", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).send("Name and email are required.");
  }
  const data = readData();
  let id = generateId();
  // Ensure the ID is unique
  while (data[id]) {
    id = generateId();
  }
  data[id] = { name, email };

  writeData(data);
  res.send(`Saved with ID: ${id}`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
