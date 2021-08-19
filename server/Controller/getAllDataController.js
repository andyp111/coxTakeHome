const axios = require('axios');
const DealersAndVehicles = require('coxdealervehiclesandy');

const dealersApi = new DealersAndVehicles.DealersApi();
const vehiclesApi = new DealersAndVehicles.VehiclesApi();


module.exports = {
    getAndPost: async (req, res) => {
        let promises = [];
        const answ = { dealers: [] };
        let datasetId = req.params.id;
        const vehiclesUrl = vehiclesApi.getIds(datasetId).url;

        await axios.get(vehiclesUrl)
            .then((result) => {
                const vehicleIds = result.data.vehicleIds;
                for (let i = 0; i < vehicleIds.length; i++) {
                    let vehicleId = vehicleIds[i];
                    let vehicleInfoUrl = vehiclesApi.getVehicle(datasetId, vehicleId).url;
                    promises.push(axios.get(vehicleInfoUrl)
                        .then((result) => {
                            let vehicleInfo = result.data;
                            let dealerId = vehicleInfo.dealerId;
                            let dealerUrl = dealersApi.getDealer(datasetId, dealerId).url;

                            return axios.get(dealerUrl)
                                .then((result) => {
                                    let dealerName = result.data.name;
                                    let copyOfDealerArr = [...answ.dealers];

                                    let found = copyOfDealerArr.some(el => el.name === dealerName);

                                    if (found) {
                                        let index = copyOfDealerArr.findIndex((el) => {
                                            return el.name === dealerName
                                        });

                                        let copyOfVehiclesArr = answ.dealers[index].vehicles;
                                        copyOfVehiclesArr.push({
                                            'vehicleId': vehicleInfo.vehicleId,
                                            'year': vehicleInfo.year,
                                            'make': vehicleInfo.make,
                                            'model': vehicleInfo.model
                                        })

                                        answ.dealers[index].vehicles = copyOfVehiclesArr;
                                    } else {
                                        copyOfDealerArr.push({
                                            'dealerId': dealerId,
                                            'name': dealerName,
                                            'vehicles': []
                                        })

                                        answ.dealers = copyOfDealerArr;

                                        let len = copyOfDealerArr.length - 1;
                                        let copyOfVehiclesArr = answ.dealers[len].vehicles;

                                        copyOfVehiclesArr.push({
                                            'vehicleId': vehicleInfo.vehicleId,
                                            'year': vehicleInfo.year,
                                            'make': vehicleInfo.make,
                                            'model': vehicleInfo.model
                                        })

                                        answ.dealers[len].vehicles = copyOfVehiclesArr;
                                    }
                                })
                        }))
                }
            })
            .then(() => {
                Promise.all(promises).then(() => res.status(200).send(answ))
            })

            .catch((error) => {
                res.status(400).send(error);
            })
    }
}