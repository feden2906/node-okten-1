const router = require('express').Router();

const { carController } = require('../controllers');
const { carMiddleware } = require('../middlewares');

router.get(
    '/',
    carController.getAllCars
);
router.post(
    '/',
    carMiddleware.validateCarBody,
    carController.createCar
);
router.get(
    '/:car_id',
    carMiddleware.isCarPresentByDynmicParam('car_id', 'params', '_id'),
    carController.getSingleCar
);
router.delete(
    '/:car_id',
    carMiddleware.isCarPresentByDynmicParam('car_id', 'params', '_id'),
    carController.deleteCar
);
router.put(
    '/:car_id',
    carMiddleware.validateUpdateCar,
    carMiddleware.isCarPresentByDynmicParam('car_id', 'params', '_id'),
    carController.updateCar
);

module.exports = router;
