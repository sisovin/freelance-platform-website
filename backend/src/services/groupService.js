const Group = require('../models/Group');

// Create a new group
const createGroup = async (name, description, createdBy) => {
  try {
    const newGroup = new Group({
      name,
      description,
      createdBy,
    });
    const savedGroup = await newGroup.save();
    return savedGroup;
  } catch (error) {
    throw new Error('Error creating group');
  }
};

// Get all groups
const getAllGroups = async () => {
  try {
    const groups = await Group.find();
    return groups;
  } catch (error) {
    throw new Error('Error fetching groups');
  }
};

// Get a single group by ID
const getGroupById = async (id) => {
  try {
    const group = await Group.findById(id);
    if (!group) {
      throw new Error('Group not found');
    }
    return group;
  } catch (error) {
    throw new Error('Error fetching group');
  }
};

// Update a group by ID
const updateGroup = async (id, name, description) => {
  try {
    const updatedGroup = await Group.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    if (!updatedGroup) {
      throw new Error('Group not found');
    }
    return updatedGroup;
  } catch (error) {
    throw new Error('Error updating group');
  }
};

// Delete a group by ID
const deleteGroup = async (id) => {
  try {
    const deletedGroup = await Group.findByIdAndDelete(id);
    if (!deletedGroup) {
      throw new Error('Group not found');
    }
    return { message: 'Group deleted successfully' };
  } catch (error) {
    throw new Error('Error deleting group');
  }
};

module.exports = {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
};
