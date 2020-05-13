require('dotenv').config();
const Costumers = require('../models').costumer;
const { ErrorHandler } = require('../helper/error');
const nodemailer = require('nodemailer');

exports.addCostumer = (req, res, next) => {
  Costumers
    .create({
      name: req.body.name,
      email: req.body.email,
    })
    .then(data => {
      res.status(201).send({
        costumer: data,
        message: 'Costumer has been created!'
      });

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        }
      });

      var mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: 'POS APP',
        html: 'Hello there, this is your receipt from POS-APP <a href="https://eloquentjavascript.net/Eloquent_JavaScript.pdf">Receipt.pdf</a>',
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
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

  try {
    const costumer = await Costumers.findOne({
      id: costumerId
    });
    if (!costumer) {
      throw new ErrorHandler(404, 'Costumer not found!')
    } else {
      Costumers
        .update({
          name: req.body.name,
          email: req.body.email,
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
