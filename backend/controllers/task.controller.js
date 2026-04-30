const Task = require('../models/Task');
const Project = require('../models/Project');

exports.createTask = async (req, res) => {
  try {
    const { title, description, project, assignedTo, status, priority, dueDate } =
      req.body;
    if (!title || !project)
      return res.status(400).json({ message: 'Title & project required' });

    const proj = await Project.findById(project);
    if (!proj) return res.status(404).json({ message: 'Project not found' });

    const isMember =
      proj.members.includes(req.user._id) || req.user.role === 'Admin';
    if (!isMember) return res.status(403).json({ message: 'Forbidden' });

    const task = await Task.create({
      title,
      description,
      project,
      assignedTo,
      status,
      priority,
      dueDate,
      createdBy: req.user._id,
    });

    const populated = await task.populate([
      { path: 'assignedTo', select: 'name email' },
      { path: 'createdBy', select: 'name email' },
      { path: 'project', select: 'name color' },
    ]);

    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { project, status, assignedTo } = req.query;
    const filter = {};
    if (project) filter.project = project;
    if (status) filter.status = status;
    if (assignedTo) filter.assignedTo = assignedTo;

    if (req.user.role !== 'Admin') {
      const userProjects = await Project.find({
        $or: [{ owner: req.user._id }, { members: req.user._id }],
      }).select('_id');
      filter.project = { $in: userProjects.map((p) => p._id) };
    }

    const tasks = await Task.find(filter)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .populate('project', 'name color')
      .sort('-createdAt');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('project');
    if (!task) return res.status(404).json({ message: 'Not found' });

    const isOwner = task.project.owner.equals(req.user._id);
    const isAssignee = task.assignedTo?.equals(req.user._id);
    const isAdmin = req.user.role === 'Admin';

    // Members can only update status of their own tasks
    if (!isOwner && !isAdmin) {
      if (!isAssignee)
        return res.status(403).json({ message: 'Forbidden' });
      const allowed = ['status'];
      Object.keys(req.body).forEach((k) => {
        if (!allowed.includes(k)) delete req.body[k];
      });
    }

    Object.assign(task, req.body);
    await task.save();

    const populated = await task.populate([
      { path: 'assignedTo', select: 'name email' },
      { path: 'createdBy', select: 'name email' },
      { path: 'project', select: 'name color' },
    ]);
    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('project');
    if (!task) return res.status(404).json({ message: 'Not found' });

    const isOwner = task.project.owner.equals(req.user._id);
    if (!isOwner && req.user.role !== 'Admin')
      return res.status(403).json({ message: 'Forbidden' });

    await task.deleteOne();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};