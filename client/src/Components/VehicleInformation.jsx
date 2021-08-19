import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VehicleInfoEntry from './VehicleInfoEntry.jsx';

const VehicleInformation = (props) => {
    //state to store retrieved vehicle information
    const [vehicleInfo, setVehicleInfo] = useState(null);
    //state to compare if new vehicleid has been selected
    const [vehicleId, setVehicleId] = useState(props.vehicleId);

    
    useEffect(() => {
        getVehicleInfo();
    }, [props])
    
    
    if (props.vehicleId !== vehicleId) {
         console.log('props have updated');
         setVehicleId(props.vehicleId);
    }
    
    //retrieves vehicle information, dependent on selecting vehicleId
    const getVehicleInfo = async () => {
        await axios.get(`/api/vehicles?id=${props.datasetId}&vehicleId=${vehicleId}`)
            .then((result) => {
                setVehicleInfo(result.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const renderVehicleInformation = (data) => {
        if (data) {
            return (
                <VehicleInfoEntry
                    data={vehicleInfo}
                    datasetId={props.datasetId}
                    handleAdd={(dealer, vehicle) => props.handleAdd(dealer, vehicle)}
                />)

        }
    }

    return (
        <div style={{display: 'flex', marginLeft: '25px'}}>
            {renderVehicleInformation(vehicleInfo)}
        </div>
    )
}

export default VehicleInformation;