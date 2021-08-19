const axios = require('axios');
const DealersAndVehicles = require('coxdealervehiclesandy');

const vehiclesApi = new DealersAndVehicles.VehiclesApi();

module.exports = {
    getListOfVehicles: (req, res) => {
        const id = req.params.id;
        const url = vehiclesApi.getIds(id).url;
        axios.get(url)
            .then((result) => {
                res.status(200).send(result.data);
            })
            .catch((error) => {
                res.status(400).send(error);
            })
    },

    getVehicleInformation: (req, res) => {
        const id = req.query.id;
        const vehicleId = req.query.vehicleId;

        const url = vehiclesApi.getVehicle(id, vehicleId).url;
        axios.get(url)
            .then((result) => {
                res.status(200).send(result.data);
            })
            .catch((error) => {
                res.status(400).send(error);
            })

    }
}