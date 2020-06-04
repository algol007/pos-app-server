const Products = require('../models').product;
const Categories = require('../models').category;
const { ErrorHandler } = require('../helper/error');
const { Op } = require("sequelize");

exports.addProduct = (req, res, next) => {
  const { name, price, categoryId } = req.body;

  Products
    .create({
      name, price, categoryId,
      image: `${process.env.BASE_URL}uploads/${req.file.filename}`,
    })
    .then(data => {
      res.status(201).send({
        product: data,
        message: 'Product has been created!'
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.getAllProducts = (req, res, next) => {
  const search = req.query.search;
  const limit = req.query.limit || 9;
  const page = req.query.page || 1;
  const offset = (page - 1) * limit;

  const response = (data) => {
    const pages = Math.ceil(data.count / limit);
    if (page > pages) {
      next();
    } else {
      res.status(200).send({
        limit: limit,
        offset: offset,
        page: `${page} of ${pages}`,
        products: data
      });
    }
  }

  if (search) {
    Products.findAndCountAll({
      where: { [Op.or]: [{ name: { [Op.substring]: search } }] },
      offset: offset,
      limit: limit,
      exclude: ["createdAt", "updatedAt"],
      include: { model: Categories, as: "productCategory", attributes: ["name"] },
  })
    .then(data => response(data))
  } else {
    Products.findAndCountAll({
      order: [["createdAt", 'DESC']],
      offset: offset,
      limit: limit,
      exclude: ["createdAt", "updatedAt"],
      include: { model: Categories, as: "productCategory", attributes: ["name"] },
    })
    .then(data => response(data))
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
  }
};

exports.getProductById = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const product = await Products.findOne({
      where: {
        id: productId
      }
    });
    if (!product) {
      throw new ErrorHandler(404, 'Product not found!');
    }
    else {
      Products
        .findOne({
          where: {
            id: productId
          },
          exclude: ["createdAt", "updatedAt"],
          include: { model: Categories, as: "productCategory", attributes: ["name"] },
        })
        .then(data => {
          res.status(200).send({
            product: data,
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  const productId = req.params.productId;
  const { name, price, categoryId } = req.body;

  try {
    const product = await Products.findOne({
      id: productId
    });
    if (!product) {
      throw new ErrorHandler(404, 'Product not found!')
    } else {
      Products
        .update({
          name, price, categoryId,
          image: `${process.env.BASE_URL}uploads/${req.file.filename}`,
        }, {
          where: {
            id: productId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'Product has been updated!',
            product: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const product = await Products.findOne({
      where: {
        id: productId
      }
    });
    if (!product) {
      throw new ErrorHandler(404, 'Product not found!');
    } else {
      Products
        .destroy({
          where: {
            id: productId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'Product has been deleted!',
            product: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};
