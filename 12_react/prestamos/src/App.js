import React, { fragment } from 'react';
import Header from './components/Header'
import Formulario from './components/formulario'

function App() {
  return (
    <fragment  className="App">
      <Header
        titulo="Cotizador de Prestamos"
      />
      <div className="container">
        <Formulario/>
      </div>
    </fragment >
  );
}

export default App;
