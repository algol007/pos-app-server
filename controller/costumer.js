const Costumers = require('../models').costumer;
const { ErrorHandler } = require('../helper/error');

exports.addCostumer = (req, res, next) => {
  const { name, email } = req.body;
  Costumers
    .create({
      name, email
    })
    .then(data => {
      res.status(201).send({
        costumer: data,
        message: 'Costumer has been created!'
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.getAllCostumers = (req, res, next) => {
  Costumers.findAndCountAll({
    exclude: ["createdAt", "updatedAt"],
  })
    .then(data => {
      res.status(200).send({
        costumers: data
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.getCostumerById = async (req, res, next) => {
  const costumerId = req.params.costumerId;

  try {
    const costumer = await Costumers.findOne({
      where: {
        id: costumerId
      }
    });
    if (!costumer) {
      throw new ErrorHandler(404, 'Costumer not found!');
    }
    else {
      Costumers
        .findOne({
          where: {
            id: costumerId
          },
          exclude: ["createdAt", "updatedAt"],
        })
        .then(data => {
          res.status(200).send({
            costumer: data,
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.updateCostumer = async (req, res, next) => {
  const costumerId = req.params.costumerId;
  const { name, email } = req.body;

  try {
    const costumer = await Costumers.findOne({
      id: costumerId
    });
    if (!costumer) {
      throw new ErrorHandler(404, 'Costumer not found!')
    } else {
      Costumers
        .update({
          name, email
        }, {
          where: {
            id: costumerId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'Costumer has been updated!',
            costumer: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.deleteCostumer = async (req, res, next) => {
  const costumerId = req.params.costumerId;

  try {
    const costumer = await Costumers.findOne({
      where: {
        id: costumerId
      }
    });
    if (!costumer) {
      throw new ErrorHandler(404, 'Costumer not found!');
    } else {
      Costumers
        .destroy({
          where: {
            id: costumerId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'Costumer has been deleted!',
            costumer: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};
