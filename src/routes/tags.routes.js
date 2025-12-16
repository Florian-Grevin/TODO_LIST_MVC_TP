const express = require('express');
const tagRouter = express.Router();
const tagController = require('../controllers/tag.controller');


tagRouter.get('/', tagController.getAllTags);
tagRouter.post('/', tagController.createTag);

module.exports = tagRouter;