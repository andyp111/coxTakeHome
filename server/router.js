const express = require('express');
const router = express.Router();
const dataSetController = require('./Controller/dataSetController');
const vehiclesController = require('./Controller/vehiclesController');
const dealersController = require('./Controller/dealersController');
const getAllDataController = require('./Controller/getAllDataController');


router
    .route('/getId')
    .get(dataSetController.getDataSetId)

router
    .route('/postAnswer/:id')
    .post(dataSetController.postDataAnswer)

router
    .route('/vehicles/:id')
    .get(vehiclesController.getListOfVehicles)

router
    .route('/vehicles?')
    .get(vehiclesController.getVehicleInformation)

router
    .route('/dealers?')
    .get(dealersController.getDealerInformation)

router
    .route('/getAll/:id')
    .get(getAllDataController.getAndPost);

module.exports = router;