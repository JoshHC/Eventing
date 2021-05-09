import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EventContainer from './Components/EventContainerFolder/EventContainer';


function ValidateLocalStorage() {
  var storedlist = localStorage.getItem('EventData');
  if (storedlist == null) {
    //Elementos para almacenar en local storage
    const EventsData = [
      { id: 1, nombre: "Coldplay Concert", descripcion: "A marvelous concert of coldplay", inicio: "10:45", fin: "11:45", boletos: 550, fotografia: "https://images.squarespace-cdn.com/content/v1/5ca4ccae8dfc8c3d55b30c4b/1554485986869-KXBAG4G64H3FCQT7RYPJ/ke17ZwdGBToddI8pDm48kCGAAHQmI8II7NcuVq5GYhp7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0hReLB75oIvKxcDxwlnLXaZ3_GtJvojPVMLAFO5-XuxFQguVqbGO9EfgiGh3LnM8Kg/Events.jpg?format=2500w", ubicacion: "Guatemala, Ciudad Cayala" },
      { id: 2, nombre: "Imagine Dragons Concert", descripcion: "A marvelous concert of Imagine Dragons", inicio: "08:45", fin: "09:45", boletos: 1500, fotografia: "https://images.squarespace-cdn.com/content/v1/5ca4ccae8dfc8c3d55b30c4b/1554485986869-KXBAG4G64H3FCQT7RYPJ/ke17ZwdGBToddI8pDm48kCGAAHQmI8II7NcuVq5GYhp7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0hReLB75oIvKxcDxwlnLXaZ3_GtJvojPVMLAFO5-XuxFQguVqbGO9EfgiGh3LnM8Kg/Events.jpg?format=2500w", ubicacion: "Guatemala, Ciudad Cayala" },
    ];
    localStorage.setItem('EventData', JSON.stringify(EventsData));
  }
}

function App() {
  return (
    <div>
      <EventContainer />
    </div>
  )
}

export default App;