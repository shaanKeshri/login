const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User"); // Import your User model

const app = express();
app.use(express.json());

app.post("/your-endpoint", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res
      .status(201)
      .send({
        message: "Data saved successfully",
        uniqueId: req.body.uniqueId,
      });
  } catch (error) {
    res.status(500).send({ message: "Error saving data" });
  }
});

// Replace 'your-db-connection-string' with your actual MongoDB connection string
mongoose.connect("your-db-connection-string", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
