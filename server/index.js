import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use(express.json());

const topicSchema = new mongoose.Schema({
  title: String,
  published_at: { type: Date, default: Date.now },
  score: { type: Number, default: 0 },
});

const Topic = mongoose.model('Topic', topicSchema);

app.post('/topics', async (req, res) => {
  try {
    const { title } = req.body;
    const topic = new Topic({ title })
    await topic.save();
    res.status(201).json(topic);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create topic!', details: error.message })
  }
});

app.get('/topics', async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve topics!', details: error.message })
  }
});

app.delete('/topics/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Topic.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete Topic' })
  }
})

app.put('/topics/:id/up', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Topic.findByIdAndUpdate(
      id,                       // Find the document by _id
      { $inc: { score: 1 } },  // Increase the score by 1
      { new: true }             // Return the updated document
    );

    if (!result) {
      return res.status(404).json({ error: 'Topic not found!' });
    }

    res.status(200).json({ message: 'Score updated successfully!', topic: result });
  } catch (error) {
    res.status(400).json({ error: 'Bad request!' })
  }
})

app.put('/topics/:id/down', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Topic.findByIdAndUpdate(
      id,                       // Find the document by _id
      { $inc: { score: -1 } },  // Decrement the score by 1
      { new: true }             // Return the updated document
    );

    if (!result) {
      return res.status(404).json({ error: 'Topic not found!' });
    }

    res.status(200).json({ message: 'Score updated successfully!', topic: result });
  } catch (error) {
    res.status(400).json({ error: 'Bad request!' })
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});