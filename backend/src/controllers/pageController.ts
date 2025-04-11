const Page = require('../models/Page');

const createPage = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPage = new Page({ title, content, createdBy: req.user.id });
    await newPage.save();
    res.status(201).json(newPage);
  } catch (error) {
    res.status(500).json({ message: 'Error creating page', error });
  }
};

const getAllPages = async (req, res) => {
  try {
    const pages = await Page.find();
    res.status(200).json(pages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pages', error });
  }
};

const getPageById = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.status(200).json(page);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching page', error });
  }
};

const updatePage = async (req, res) => {
  try {
    const { title, content } = req.body;
    const page = await Page.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.status(200).json(page);
  } catch (error) {
    res.status(500).json({ message: 'Error updating page', error });
  }
};

const deletePage = async (req, res) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.id);
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.status(200).json({ message: 'Page deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting page', error });
  }
};

module.exports = {
  createPage,
  getAllPages,
  getPageById,
  updatePage,
  deletePage,
};
