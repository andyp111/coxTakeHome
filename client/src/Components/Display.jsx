import React, { useEffect, useState } from 'react';
import VehicleInformation from './VehicleInformation.jsx';
import axios from 'axios';

const Display = (props) => {

    let dealersPost = {
        'dealers': []
    };

    //vehiclesId list that is retrieved from api (only changes depending on datasetId)
    const [vehiclesId, setVehiclesId] = useState(null);
    //selected vehicleId 
    const [selectedValue, setSelectedValue] = useState('');
    //state is for posting once all has been added
    const [addedData, setAddedData] = useState(null);
    //keep track on datasetId
    const datasetId = props.data.datasetId;
    const [message, setMessage] = useState('');
    const [totalTime, setTotalTime] = useState(0);


    //currently have to add each vehicle then post
    //need to implement post 
    //need to implement button that just does all of the work

    useEffect(() => {
        getVehicleList(props.data.datasetId);
    }, [])


    const getVehicleList = async (id) => {
        await axios.get(`/api/vehicles/${id}`)
            .then((result) => {
                let copy = { ...result.data };
                let copyArr = [...copy.vehicleIds];
                copyArr.unshift('');
                copy.vehicleIds = copyArr;
                setVehiclesId(copy);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //renders select dropdown once vehiclesId list is retrieved
    const renderListOfVehiclesId = (data) => {
        if (data) {
            return data.vehicleIds.map((id, index) => {
                return (
                    <option key={index} value={id}>{id}</option>
                )
            })
        }
    }

    //add callback that is passed down to the last child comp, 
    //adds each vehicle accordingly
    const handleAdd = (dealer, vehicle) => {
        //when nothing has been added
        if (addedData === null) {
            let copy = { ...dealersPost };
            let dealerArr = [];
            let vehiclesArr = [];

            dealerArr.push(dealer);
            vehiclesArr.push(vehicle);

            copy.dealers = dealerArr;
            copy.dealers[0].vehicles = vehiclesArr;

            setAddedData(copy);
        } else {
            let stateCopy = { ...addedData };
            let copyOfDealerArr = stateCopy.dealers;
            const found = copyOfDealerArr.some(el => el.name === dealer.name);
            //if dealer's name already exists
            if (found) {
                let index = copyOfDealerArr.findIndex((el) => {
                    return el.name === dealer.name
                });

                let copyOfVehiclesArr = stateCopy.dealers[index].vehicles;
                copyOfVehiclesArr.push(vehicle);
                stateCopy.dealers[index].vehicles = copyOfVehiclesArr;

                setAddedData(stateCopy);
                //otherwise add dealer with vehicle
            } else {
                let copyOfDealerArr = stateCopy.dealers;
                copyOfDealerArr.push(dealer);
                stateCopy.dealers = copyOfDealerArr;

                let len = copyOfDealerArr.length - 1;
                let copyOfVehiclesArr = stateCopy.dealers[len].vehicles;

                copyOfVehiclesArr.push(vehicle);
                stateCopy.dealers[len].vehicles = copyOfVehiclesArr;

                setAddedData(stateCopy);
            }
        }
    }
    //function not needed
    const postAllData = () => {
        axios.post(`/api/postAnswer/${datasetId}`, addedData)
            .then((result) => {
                console.log(result);
                console.log(result.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    //handles dropdown selection for target value
    const handleSelectedValue = (e) => {
        setSelectedValue(e.target.value);
    }

    //renders new component only when vehicle id has been selected
    const renderVehicleInformation = (selected) => {
        if (selected) {
            return (
                <VehicleInformation
                    vehicleId={selectedValue}
                    datasetId={datasetId}
                    handleAdd={(dealer, vehicle) => handleAdd(dealer, vehicle)}
                />)
        }
    }
    //function will call get all from backend and post directly
    const handleGetAndPostAll = () => {
        return axios.get(`/api/getAll/${datasetId}`)
            .then((result) => {
                let answ = result.data;
                return axios.post(`/api/postAnswer/${datasetId}`, answ)
                    .then((result) => {
                        let message = result.data.message;
                        let totalTime = result.data.totalMilliseconds;
                        setMessage(message);
                        setTotalTime(totalTime);
                    })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <p style={{ display: 'flex', justifyContent: 'center' }}>DatasetId: {props.data.datasetId}</p>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <div style={{ margin: '10px' }}>
                    <select value={selectedValue} onChange={handleSelectedValue}>
                        {renderListOfVehiclesId(vehiclesId)}
                    </select>
                </div>
                <div>
                    {renderVehicleInformation(selectedValue)}
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <p>Retrive data and post. Message will display below!</p>
            </div>

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button onClick={() => handleGetAndPostAll()}>Get</button>
                <div style={{justifyContent: 'center'}}>
                    {message} {" "}
                    {totalTime / 1000} seconds
                </div>
            </div>
        </>
    )
}

export default Display;