require('dotenv').config();
const Categories = require('../models').category;
const { ErrorHandler } = require('../helper/error');

exports.addCategory = (req, res, next) => {
  Categories
    .create({
      name: req.body.name,
    })
    .then(data => {
      res.status(201).send({
        category: data,
        message: 'Category has been created!'
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.getAllCategories = (req, res, next) => {
  Categories.findAndCountAll({
    exclude: ["createdAt", "updatedAt"],
  })
    .then(data => {
      res.status(200).send({
        Categories: data
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.getCategoryById = async (req, res, next) => {
  const categoryId = req.params.categoryId;

  try {
    const category = await Categories.findOne({
      where: {
        id: categoryId
      }
    });
    if (!category) {
      throw new ErrorHandler(404, 'Category not found!');
    }
    else {
      Categories
        .findOne({
          where: {
            id: categoryId
          },
          exclude: ["createdAt", "updatedAt"],
        })
        .then(data => {
          res.status(200).send({
            category: data,
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  const categoryId = req.params.categoryId;

  try {
    const category = await Categories.findOne({
      id: categoryId
    });
    if (!category) {
      throw new ErrorHandler(404, 'Category not found!')
    } else {
      Categories
        .update({
          name: req.body.name,
        }, {
          where: {
            id: categoryId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'Category has been updated!',
            category: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  const categoryId = req.params.categoryId;

  try {
    const category = await Categories.findOne({
      where: {
        id: categoryId
      }
    });
    if (!category) {
      throw new ErrorHandler(404, 'Category not found!');
    } else {
      Categories
        .destroy({
          where: {
            id: categoryId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'Category has been deleted!',
            category: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

