const Project = require('../models/Project');
const Task = require('../models/Task');

exports.createProject = async (req, res) => {
  try {
    const { name, description, members, color, status } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });

    const project = await Project.create({
      name,
      description,
      color,
      status,
      owner: req.user._id,
      members: [...new Set([req.user._id.toString(), ...(members || [])])],
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const filter =
      req.user.role === 'Admin'
        ? {}
        : { $or: [{ owner: req.user._id }, { members: req.user._id }] };

    const projects = await Project.find(filter)
      .populate('owner', 'name email')
      .populate('members', 'name email role')
      .sort('-createdAt');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('owner', 'name email')
      .populate('members', 'name email role');
    if (!project) return res.status(404).json({ message: 'Not found' });

    const isMember =
      project.members.some((m) => m._id.equals(req.user._id)) ||
      req.user.role === 'Admin';
    if (!isMember) return res.status(403).json({ message: 'Access denied' });

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Not found' });

    const isOwner = project.owner.equals(req.user._id);
    if (!isOwner && req.user.role !== 'Admin')
      return res.status(403).json({ message: 'Only owner/admin can edit' });

    Object.assign(project, req.body);
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Not found' });

    const isOwner = project.owner.equals(req.user._id);
    if (!isOwner && req.user.role !== 'Admin')
      return res.status(403).json({ message: 'Only owner/admin can delete' });

    await Task.deleteMany({ project: project._id });
    await project.deleteOne();
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addMember = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Not found' });

    if (!project.owner.equals(req.user._id) && req.user.role !== 'Admin')
      return res.status(403).json({ message: 'Forbidden' });

    const { userId } = req.body;
    if (!project.members.includes(userId)) project.members.push(userId);
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};