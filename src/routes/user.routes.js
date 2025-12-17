const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user.controller');
const {requireAuth, requireRole} = require('../middlewares/auth.middleware');


userRouter.get('/', userController.getAllUsers);
userRouter.post('/', userController.createUser);

// 1. Route Profil (Tout le monde connecté)
userRouter.get('/profile', requireAuth, (req, res) => {
res.json(req.user);
});
// 2. Route Admin (Seulement les Boss)
userRouter.get('/admin', requireAuth, requireRole('ADMIN'), (req, res) => {
res.json({ message: "Bienvenue dans la zone secrète Admin" });
});

module.exports = userRouter;