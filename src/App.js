import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Error from './components/Error';
import axios from 'axios';

function App() {

  // State
  const [pais, guardarPais] = useState('');
  const [ciudad, guardarCiudad] = useState('');
  const [error, guardarError] = useState(false);

  // URL Data
  const appID = 'c8a234c291b86312f28838ef57a74e2e';
  const path = 'https://samples.openweathermap.org/data/2.5/weather/';
  
  useEffect(() => {
    if(ciudad === '') return;
    const consultarAPI = async() => {
      const clima = await axios.get( path, {
        mode: 'no-cors',
        params: {
          q : `${ciudad},${pais}`, 
          appid : appID
        },
        headers: {
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Headers':'application/json',
        }
      });
      console.log('clima', clima)
    // const url = `${path}?q=${ciudad},${pais}&appid=${appID}`;
    // const respuesta = await fetch(url);
    // const resultado = await respuesta.json();

    // console.log('resultado', resultado)
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
    component = null;
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
