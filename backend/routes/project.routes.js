const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const ctrl = require('../controllers/project.controller');

const router = express.Router();
router.use(protect);

router.route('/').get(ctrl.getProjects).post(ctrl.createProject);
router
  .route('/:id')
  .get(ctrl.getProject)
  .put(ctrl.updateProject)
  .delete(ctrl.deleteProject);
router.post('/:id/members', ctrl.addMember);

module.exports = router;