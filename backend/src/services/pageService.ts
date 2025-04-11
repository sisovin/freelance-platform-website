const Page = require('../models/Page');

const createPage = async (title, content, userId) => {
  try {
    const newPage = new Page({ title, content, createdBy: userId });
    await newPage.save();
    return newPage;
  } catch (error) {
    throw new Error('Error creating page');
  }
};

const getAllPages = async () => {
  try {
    const pages = await Page.find();
    return pages;
  } catch (error) {
    throw new Error('Error fetching pages');
  }
};

const getPageById = async (pageId) => {
  try {
    const page = await Page.findById(pageId);
    if (!page) {
      throw new Error('Page not found');
    }
    return page;
  } catch (error) {
    throw new Error('Error fetching page');
  }
};

const updatePage = async (pageId, title, content) => {
  try {
    const page = await Page.findByIdAndUpdate(
      pageId,
      { title, content },
      { new: true }
    );
    if (!page) {
      throw new Error('Page not found');
    }
    return page;
  } catch (error) {
    throw new Error('Error updating page');
  }
};

const deletePage = async (pageId) => {
  try {
    const page = await Page.findByIdAndDelete(pageId);
    if (!page) {
      throw new Error('Page not found');
    }
    return { message: 'Page deleted successfully' };
  } catch (error) {
    throw new Error('Error deleting page');
  }
};

module.exports = {
  createPage,
  getAllPages,
  getPageById,
  updatePage,
  deletePage,
};
