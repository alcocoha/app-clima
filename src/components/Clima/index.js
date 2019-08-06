import React, { Fragment } from 'react';

function Clima(props) {
    console.log('props', props)
    const { dataWeather } = props;
    console.log('Object.entries(obj)', Object.entries(dataWeather));

    if(Object.entries(dataWeather).length === 0) return null;

    console.log('dataWeather', dataWeather)

    if(dataWeather.statusCode === 404) {
        return (
            <div className="card-panel white col s12">
                Datos no encontrados
            </div>
        )
    }

    const { name, main } = dataWeather;

    const kelvin = 273.15;

    return (
        <div className="card-panel white col s12">
            <div className="black-text">
                <h2>El clima de {name} es:</h2>
                <p className="temperatura">
                    { parseInt(main.temp - kelvin, 10)} <span>&#x2103;</span>
                </p>
                <p>
                    Máxima temperatura : { parseInt(main.temp_min - kelvin, 10)}&#x2103;
                </p>
                <p>
                    Máxima temperatura : { parseInt(main.temp_max - kelvin, 10)}&#x2103;
                </p>
            </div>
        </div>
    )
}

export default Clima;
