import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Display from './Components/Display.jsx';


const App = () => {

    //state that will store id
    const [datasetId, setDatasetId] = useState(null);

    useEffect(() => {
        getDataSetId();
    }, [])

    //data set only changes when page refreshes, per assignment only needs one datasetId
    const getDataSetId = () => {
        axios.get('api/getId')
            .then((result) => {
                setDatasetId(result.data);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    //once there is a datasetId, render Display
    const renderDisplay = (data) => {
        if (data) return <Display data={datasetId} />
    }

    return (
        <div>
            <header style={{ display: 'flex', justifyContent: 'center' }}>Cox Automotive Take Home!</header>
            <div>
                {renderDisplay(datasetId)}
            </div>
        </div>
    )
}

export default App;