const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const ctrl = require('../controllers/task.controller');

const router = express.Router();
router.use(protect);

router.route('/').get(ctrl.getTasks).post(ctrl.createTask);
router.route('/:id').put(ctrl.updateTask).delete(ctrl.deleteTask);

module.exports = router;