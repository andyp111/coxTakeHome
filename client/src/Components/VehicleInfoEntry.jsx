import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VehicleInfoEntry = (props) => {

    const [dealerName, setDealerName] = useState('');
    const datasetId = props.datasetId;
    const [data, setData] = useState(props.data);
    const [dealerId, setDealerId] = useState(props.data.dealerId);
    const [vehicleId, setVehicleId] = useState(props.data.vehicleId); 
    const [isLoading, setIsLoading] = useState(false);

    if (props.data !== data) {
        console.log('props have updated');
        setData(props.data);
        setDealerId(props.data.dealerId);
        setVehicleId(props.data.vehicleId);
    }

    //models for dealer data and vehicle data when added
    const addDealerData = {
        dealerId: dealerId,
        name: dealerName,
        vehicles: []
    }

    const vehicleData = {
        vehicleId: vehicleId,
        year: data.year,
        make: data.make,
        model: data.model
    }

    useEffect(() => {
        getDealerName();
    }, [props.data.dealerId])


    //call to get dealername only when dealerid is changed
    //dependent on props updating
    const getDealerName = async () => {
        setIsLoading(true);
        await axios.get(`api/dealers?id=${datasetId}&dealerId=${dealerId}`)
            .then((result) => {
                console.log(result.data);
                setDealerName(result.data.name);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    //loads dealer name, if changing, renders loading...
    const loadingDealerName = (isLoading, dealerName) => {
        if (isLoading) {
            return <div style={{marginLeft: '5px'}}>Loading...</div>
        } else {
            return <div style={{marginLeft: '5px'}}>{dealerName}</div>
        }
    }

    const renderAllInfo = (info, data) => {
        if (info) {
            return (
                <div style={{border:'1px solid gray', width: '250px'}}>
                    <p>Year | {data.year}</p>
                    <p>Make | {data.make}</p>
                    <p>Model | {data.model}</p>
                    <div style={{display: 'flex'}}>Dealer | {loadingDealerName(isLoading, dealerName)}</div>
                    <div>
                        <button onClick={() => props.handleAdd(addDealerData, vehicleData)}>Add</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="lds-dual-ring"></div>
            )
        }
    }

    return (
        <div>
            <div>
                {renderAllInfo(dealerName, data)}
            </div>
        </div>
    )
}

export default VehicleInfoEntry;