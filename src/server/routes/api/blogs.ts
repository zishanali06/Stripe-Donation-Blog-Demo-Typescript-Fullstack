import * as express from 'express';
import db from '../../db';
import { RequestHandler } from 'express-serve-static-core';

const router = express.Router();

const isAdmin: RequestHandler = (req, res, next) => {
    if(!req.user || req.user.role !== 'guest') {
        return res.sendStatus(401);
    } else {
        return next();
    }
}

//get tags for specific post
router.get('/tags/:id', async (req, res) => {
    try {
        res.json(await db.Blogs.getTags(req.params.id));
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

//get all tags
router.get('/alltags', async (req, res) => {
    try {
        res.json(await db.Blogs.allTags());
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

//get single or all blog posts
router.get('/:id?', async (req, res) => {
    let id: number = req.params.id;
    if (id) {
        try {
            res.json(await db.Blogs.one(id))
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        };
    } else {
        try {
            res.json(await db.Blogs.all())
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        };
    };
});

//change blog post
router.put('/change/:id', async (req, res) => {
    try {
        await db.Blogs.changepost(req.params.id, req.body);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

//delete blog post
router.delete('/delete/:id', async (req, res) => {
    try {
        await db.Blogs.remove(req.params.id);
        res.status(200).json('Deleted');
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//add new blog post
router.post('/add', isAdmin, async (req, res) => {
    try{
        await db.Blogs.addpost(req.body);
        res.json({ message: 'Blog Post Added'});
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

export default router;