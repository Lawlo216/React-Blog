const router = require('express').Router();
const verify = require('./verifyToken');

const User = require('../models/User');
const Post = require('../models/Post');

// @route     GET blog/posts
// @desc      Get all users posts
// @access    Private
// router.get('/', verify, async (req,res)=> {
router.get('/', async (req,res)=> {
    try {
        // const posts = await Post.find({ user: req.user.id }).sort({ date: -1 });
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route     POST blog/posts
// @desc      Add new post
// @access    Private
router.post('/', verify, async (req,res)=> {

    try {
        const newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            by: req.body.by,
            date: req.body.date,
            user: req.user.id
        });

        const post = await newPost.save();

        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route     PUT blog/posts/:id
// @desc      Update post
// @access    Private
router.put('/:id', verify, async (req,res)=> {
    const { title, content, by, date } = req.body;

    //Build post object
    const postFields = {};
    if (title) postFields.title = title;
    if (content) postFields.content = content;
    if (by) postFields.by = by;
    if (date) postFields.date = date;

    try {
        let post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({msg: 'Post not found'});

        //Make sure user own post
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'Not authorized' });
        }
        post = await Post.findByIdAndUpdate(
            req.params.id,
            {$set: postFields},
            {new: true}
        );
        res.json(post);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route     PUT blog/posts/:id
// @desc      Delete post
// @access    Private
router.delete('/:id', verify, async (req,res)=> {
    try {
        let post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({msg: 'Post not found'});

        //Make sure user own post
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'Not authorized' });
        }
        await Post.findByIdAndRemove(req.params.id);
        res.json({msg: 'Post removed'});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;