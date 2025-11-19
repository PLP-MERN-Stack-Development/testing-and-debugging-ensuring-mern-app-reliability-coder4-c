// server/src/app.js - Express application setup
const express = require('express');
const mongoose = require('mongoose');
const Post = require('./models/Post');
const User = require('./models/User');
const { verifyToken } = require('./utils/auth');

const app = express();

// Middleware
app.use(express.json());

// Authentication middleware
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid authorization header' });
  }

  const token = authHeader.substring(7);
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  req.userId = decoded.userId;
  next();
};

// Routes

// Home route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

// POST /api/posts - Create a new post
app.post('/api/posts', authMiddleware, async (req, res) => {
  try {
    const { title, content, category } = req.body;

    // Validation
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const post = await Post.create({
      title,
      content,
      category,
      author: req.userId,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/posts - Get all posts with filtering and pagination
app.get('/api/posts', async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (category) {
      query.category = category;
    }

    const posts = await Post.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('author', 'username email');

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/posts/:id - Get a post by ID
app.get('/api/posts/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const post = await Post.findById(req.params.id).populate('author', 'username email');

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/posts/:id - Update a post
app.put('/api/posts/:id', authMiddleware, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if user is the author
    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized to update this post' });
    }

    // Update post
    const { title, content, category } = req.body;
    if (title) post.title = title;
    if (content) post.content = content;
    if (category) post.category = category;

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/posts/:id - Delete a post
app.delete('/api/posts/:id', authMiddleware, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if user is the author
    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized to delete this post' });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
