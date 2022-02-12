const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
   Post.findAll({
       where:{
           user_id: req.session.user_id
       },
       order: [
           ['id', 'DESC']
       ]
   })
   .then(dbPostData => {
    // pass a single post object into the homepage template
    const posts = dbPostData.map(post => post.get({ plain: true }));
    console.log(posts)
    res.render('dashboard', {
        posts,
        loggedIn: req.session.loggedIn
    });
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
})

router.get('/new', withAuth, (req, res) => {
    res.render('newPost', {
        loggedIn: req.session.loggedIn
    })
})

router.get('/edit/:id', withAuth, (req, res) => {
    Post.findByPk(req.params.id)
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with that id!' });
            return;
        }
        const post = dbPostData.get({ plain: true });

        res.render('edit-post', {
            post,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;