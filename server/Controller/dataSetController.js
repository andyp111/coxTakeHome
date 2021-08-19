const axios = require('axios');
const DealersAndVehicles = require('coxdealervehiclesandy');

const dataSetApi = new DealersAndVehicles.DataSetApi();

module.exports = {
    getDataSetId: (req, res) => {
        const url = dataSetApi.getDataSetId().url;
        axios.get(url)
            .then((result) => {
                res.status(200).send(result.data);
            })
            .catch((error) => {
                res.status(400).send(error);
            })
    },

    postDataAnswer: (req, res) => {
        const id = req.params.id;
        const url = dataSetApi.postAnswer(id).url;
        let body = req.body;
        axios.post(url, body)
            .then((result) => {
                res.status(200).send(result.data)
            })
            .catch((error) => {
                res.status(400).send(error);
            })
    }
}