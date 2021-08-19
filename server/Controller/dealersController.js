const axios = require('axios');
const DealersAndVehicles = require('coxdealervehiclesandy');

const dealersApi = new DealersAndVehicles.DealersApi();

module.exports = {
    //need to test
    getDealerInformation: (req, res) => {
        const id = req.query.id;
        const dealerId = req.query.dealerId;

        const url = dealersApi.getDealer(id, dealerId).url;

        axios.get(url)
            .then((result) => {
                res.status(200).send(result.data);
            })
            .catch((error) => {
                res.status(400).send(error)
            })
    }
}