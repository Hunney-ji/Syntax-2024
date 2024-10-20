const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); 

// MongoDB Atlas connection string
const uri = "mongodb+srv://hunneyhunney27:7X6ixuW1y2c1XfGC@cluster0.ym0pg.mongodb.net/nameDatabase?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Define a schema and model
const nameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  time: { type: Number, required: true }
});

const Name = mongoose.model('Name', nameSchema);


// API endpoint to add a name
app.post('/api/names', async (req, res) => {
  const { name, time } = req.body; // Destructure name and time from the request body
  try {
    const newName = new Name({ name, time }); // Include time in the new document
    await newName.save();
    res.status(201).json({ message: 'Name and time added', id: newName._id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add name and time' });
  }
});

app.get('/api/names/top', async (req, res) => {
  try {
    const topNames = await Name.find().sort({ time: 1 }).limit(3); // Sort by time in ascending order and limit to 3
    res.status(200).json(topNames);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top names' });
  }
});

app.use('/', (req,res)=>{
  res.send("server is running");
});


// API endpoint to get all names
// API endpoint to get all names
app.get('/api/names', async (req, res) => {
  try {
    const names = await Name.find();
    res.status(200).json(names);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch names' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
