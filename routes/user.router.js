import express from 'express';
const router = express.Router();
import { userMongoSchema } from '../models/user.model.js';

router.use(express.json())

router.get('/', async (req, res) => {
    const users = await userMongoSchema.find();
    res.json(users)
})

router.get('/:id', getUser, async (req, res) => {
    res.json(res.currentUser)
})

router.post('/', async (req, res) => {
    try {
        const newUser = new userMongoSchema({
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender
        })
        const users = await newUser.save();
        res.json(users);
    }
    catch (err) {
        res.json({ error: err })
    }
})

router.patch('/:id', getUser, async (req, res) => {
    req.body.name != null && (res.currentUser.name = req.body.name);
    req.body.age != null && (res.currentUser.age = req.body.age);
    req.body.gender != null && (res.currentUser.gender = req.body.gender);
    try {
        const users = await res.currentUser.save();
        res.json(users);
    }
    catch (err) {
        res.json({ error: err })
    }
})


router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.currentUser.remove();
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.json(error)
    }
})

async function getUser(req, res, next) {
    try {
        const user = await userMongoSchema.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'No user found' })
        }
        res.currentUser = user;
        next();
    } catch (error) {
        res.json(error)
    }

}

export const userRouter = router;