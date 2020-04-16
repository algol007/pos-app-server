require('dotenv').config();
const Products = require('../models').product;
const { ErrorHandler } = require('../helper/error');

exports.addProduct = (req, res, next) => {
  Products
    .create({
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      categoryId: req.body.categoryId
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
  Products.findAll()
    .then(data => {
      res.status(200).send({
        products: data
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
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
          }
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

  try {
    const product = await Products.findOne({
      id: productId
    });
    if (!product) {
      throw new ErrorHandler(404, 'Product not found!')
    } else {
      Products
        .update({
          name: req.body.name,
          price: req.body.price,
          image: req.body.image,
          categoryId: req.body.categoryId
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

