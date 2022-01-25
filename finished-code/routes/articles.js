const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const Article = require('../models/article.js');

router.get('/', async (req, res) => {
    try {
        const articles = await Article.find({});
        res.json({
            articles
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'there was an internal server error'
        });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);

        if (article != null) {
            res.json({
                article
            });
        } else {
            res.status(404).json({
                error: 'there is no article with that id'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'there was an internal server error'
        });
    }
});


router.post('/',
    body('title', 'the title must not be empty').notEmpty(),
    body('description', 'the description must not be empty').notEmpty(),
    body('body', 'the body must not be empty').notEmpty(),
    body('author', 'the author name must not be empty').notEmpty(),
    body('image', 'not a valid URL').isURL(),
    async (req, res) => {

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({
                errors: errors.array()
            });
        } else {
            const article = new Article(req.body);
            await article.save();

            res.status(201).json({
                message: 'article created',
                article
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'there was an internal server error'
        });
    }
});


router.put('/:id',
    body('title', 'the title must not be empty').notEmpty(),
    body('description', 'the description must not be empty').notEmpty(),
    body('body', 'the body must not be empty').notEmpty(),
    body('author', 'the author name must not be empty').notEmpty(),
    body('image', 'not a valid URL').isURL(),
    async (req, res) => {

        try {
            const errors = validationResult(req);

            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                });
            }

            const article = await Article.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });

            if (article == null) {
                return res.status(404).json({
                    error: 'no article found with that id'
                });
            }

            return res.json({
                message: 'article updated successfully',
                article
            });

            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: 'there was an internal server error'
            });
        }
});


router.delete('/:id', async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);

        if (article == null) {
            return res.status(404).json({
                error: 'no article found with that id'
            });
        }

        return res.json({
            message: 'article deleted successfully',
            article
        });

    } catch (error) {
       console.log(error);
       res.status(500).json({
            error: 'there was an internal server error'
       });
    }
});

module.exports = router;