const router = require('express').Router();
const { getToDo, saveToDo, updateToDo, deleteToDo, searchToDo, downloadFile, toggleComplete } = require('../controllers/ToDoController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', auth, getToDo);
router.post('/save', auth, upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'file', maxCount: 1 }]), saveToDo);
router.post('/update', auth, upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'file', maxCount: 1 }]), updateToDo);
router.post('/delete', auth, deleteToDo);
router.get('/search', auth, searchToDo);
router.get('/download/:filename', auth, downloadFile);
router.post('/toggle-complete', auth, toggleComplete);

module.exports = router;
