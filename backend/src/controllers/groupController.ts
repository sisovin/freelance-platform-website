const Group = require('../models/Group');

// Create a new group
const createGroup = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newGroup = new Group({
      name,
      description,
      createdBy: req.user.id,
    });
    const savedGroup = await newGroup.save();
    res.status(201).json(savedGroup);
  } catch (error) {
    res.status(500).json({ message: 'Error creating group', error });
  }
};

// Get all groups
const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching groups', error });
  }
};

// Get a single group by ID
const getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching group', error });
  }
};

// Update a group by ID
const updateGroup = async (req, res) => {
  try {
    const { name, description } = req.body;
    const updatedGroup = await Group.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    if (!updatedGroup) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.status(200).json(updatedGroup);
  } catch (error) {
    res.status(500).json({ message: 'Error updating group', error });
  }
};

// Delete a group by ID
const deleteGroup = async (req, res) => {
  try {
    const deletedGroup = await Group.findByIdAndDelete(req.params.id);
    if (!deletedGroup) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.status(200).json({ message: 'Group deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting group', error });
  }
};

module.exports = {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
};
