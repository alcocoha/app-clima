import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Error from './components/Error';
import axios from 'axios';
import Clima from './components/Clima';

function App() {

  // State
  const [pais, guardarPais] = useState('');
  const [ciudad, guardarCiudad] = useState('');
  const [error, guardarError] = useState(false);
  const [dataWeather, guardarDataWeather] = useState({});

  // URL Data
  const appID = 'c8a234c291b86312f28838ef57a74e2e';
  const path = 'https://api.openweathermap.org/data/2.5/weather/';
  
  useEffect(() => {
    if(ciudad === '') return;
    console.log('useEffect')
    const consultarAPI = async() => {
      let clima = null;
      try{
        clima = await axios.get( path, {
          params: {
            q : `${ciudad},${pais}`, 
            appid : appID
          }
        });
        guardarDataWeather(clima.data);
      } catch(e){
        guardarDataWeather({statusCode : 404});
      }
      console.log('clima-----------', clima)
    }
    consultarAPI();


  }, [ciudad, pais]);



  const datosConsulta = datos => {
    if(datos.pais !== '' && datos.ciudad !== ''){
      guardarPais(datos.pais);
      guardarCiudad(datos.ciudad);
      guardarError(false);
    } else {
      guardarError(true);
      return;
    }
  }


  let component;

  if(error){
    component = <Error mensaje="Ambos campos son obligatorios"/>;
  } else {
    component = <Clima dataWeather={dataWeather}/>;
  }

  return (
    <div className="App">
     <Header titulo="Clima React App with Hooks"/>
     <div className="contenedor-form">
       <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario datosConsulta={datosConsulta}/>
            </div>
            <div className="col s12 m6">
             {component}
            </div>
          </div>
       </div>
     </div>
    </div>
  );
}

export default App;
