const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const Task = require('../models/Task');
const Project = require('../models/Project');

const router = express.Router();

router.get('/stats', protect, async (req, res) => {
  try {
    const userProjects = await Project.find({
      $or: [{ owner: req.user._id }, { members: req.user._id }],
    }).select('_id');
    const projectIds = userProjects.map((p) => p._id);
    const filter =
      req.user.role === 'Admin' ? {} : { project: { $in: projectIds } };

    const [total, todo, inProgress, done, overdue, projectCount] =
      await Promise.all([
        Task.countDocuments(filter),
        Task.countDocuments({ ...filter, status: 'Todo' }),
        Task.countDocuments({ ...filter, status: 'In Progress' }),
        Task.countDocuments({ ...filter, status: 'Done' }),
        Task.countDocuments({
          ...filter,
          dueDate: { $lt: new Date() },
          status: { $ne: 'Done' },
        }),
        req.user.role === 'Admin'
          ? Project.countDocuments()
          : userProjects.length,
      ]);

    const recentTasks = await Task.find(filter)
      .populate('assignedTo', 'name')
      .populate('project', 'name color')
      .sort('-createdAt')
      .limit(5);

    res.json({
      stats: { total, todo, inProgress, done, overdue, projectCount },
      recentTasks,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;