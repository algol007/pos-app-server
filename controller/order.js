const Orders = require('../models').order;
const Users = require('../models').user;
const Costumers = require('../models').costumer;
const { ErrorHandler } = require('../helper/error');

exports.addOrder = (req, res, next) => {
  const { costumerId, userId, total, invoice } = req.body;

  Orders
    .create({
      costumerId, userId, total, invoice
    })
    .then(data => {
      res.status(201).send({
        order: data,
        message: 'Order has been created!'
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.getAllOrders = (req, res, next) => {
  Orders.findAndCountAll({
    order: [["createdAt", 'DESC']],
    exclude: ["createdAt", "updatedAt"],
    include: [
      { model: Users, as: "userOrder", attributes: ["name"] },
      { model: Costumers, as: "costumerOrder", attributes: ["name", "email"] }
    ],
  })
    .then(data => {
      res.status(200).send({
        orders: data
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.getOrderById = async (req, res, next) => {
  const orderId = req.params.orderId;

  try {
    const order = await Orders.findOne({
      where: {
        id: orderId
      }
    });
    if (!order) {
      throw new ErrorHandler(404, 'Order not found!');
    }
    else {
      Orders
        .findOne({
          where: {
            id: orderId
          },
          exclude: ["createdAt", "updatedAt"],
          include: [
            { model: Users, as: "userOrder", attributes: ["name"] },
            { model: Costumers, as: "costumerOrder", attributes: ["name", "email"] }
          ],
        })
        .then(data => {
          res.status(200).send({
            order: data,
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.updateOrder = async (req, res, next) => {
  const orderId = req.params.orderId;
  const { costumerId, userId, total, invoice } = req.body;

  try {
    const order = await Orders.findOne({
      id: orderId
    });
    if (!order) {
      throw new ErrorHandler(404, 'Order not found!')
    } else {
      Orders
        .update({
          costumerId, userId, total, invoice
        }, {
          where: {
            id: orderId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'Order has been updated!',
            order: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.deleteOrder = async (req, res, next) => {
  const orderId = req.params.orderId;

  try {
    const order = await Orders.findOne({
      where: {
        id: orderId
      }
    });
    if (!order) {
      throw new ErrorHandler(404, 'Order not found!');
    } else {
      Orders
        .destroy({
          where: {
            id: orderId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'Order has been deleted!',
            order: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};
