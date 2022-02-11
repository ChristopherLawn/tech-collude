const router = require('express').Router();
const { rearg } = require('lodash');
const { Post, User } = require('../../models');

// GET all posts
router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
        attributes: ['id', 'post_title', 'post_body', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET single post based on ID
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'post_title', 'post_body', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with that id!' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            this.console.log(err);
            res.status(500).json(err);
        });
});

// POST create new post
router.post('/', (req, res) => {
    Post.create({
        post_title: req.body.post_title,
        post_body: req.body.post_body,
        user_id: req.body.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// PUT update a single post
router.put('/:id', (req, res) => {
    Post.update(
        {
            post_title: req.body.post_title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with that id!' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE single post based on ID
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;