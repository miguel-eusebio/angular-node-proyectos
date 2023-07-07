'use strict'

const express = require('express');
const ProjectController = require('../controllers/project');

const router = express.Router();

// Middlewares
const crypto = require('crypto');
const multer = require('multer');
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './uploads');
    },
    filename(req, file = {}, cb) {
        const {
            originalname
        } = file;
        const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0];
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + fileExtension);
        });
    },
});
const mul_upload = multer({
    dest: './uploads',
    storage
});

router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
router.put('/project/:id', ProjectController.updateProject);
router.delete('/project/:id', ProjectController.deleteProject);
router.post('/upload-image/:id', mul_upload.single('image'), ProjectController.uploadImage);


module.exports = router;