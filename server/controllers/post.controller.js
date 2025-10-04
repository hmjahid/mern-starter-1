import Post from '../models/post';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all posts
 */
export function getPosts(req, res) {
  Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) return res.status(500).send(err);  // 👈 return here

    res.json({ posts });
  });
}

/**
 * Save a post
 */
export function addPost(req, res) {
  if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
    return res.status(403).end(); // 👈 return here
  }

  const newPost = new Post(req.body.post);

  // Sanitize inputs
  newPost.title = sanitizeHtml(newPost.title);
  newPost.name = sanitizeHtml(newPost.name);
  newPost.content = sanitizeHtml(newPost.content);

  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  newPost.cuid = cuid();

  newPost.save((err, saved) => {
    if (err) return res.status(500).send(err); // 👈 return here

    res.json({ post: saved });
  });
}

/**
 * Get a single post
 */
export function getPost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) return res.status(500).send(err); // 👈 return here

    res.json({ post });
  });
}

/**
 * Delete a post
 */
export function deletePost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) return res.status(500).send(err); // 👈 return here

    if (!post) return res.status(404).json({ error: 'Post not found' }); // safety check

    post.remove(() => {
      res.status(200).end();
    });
  });
}
