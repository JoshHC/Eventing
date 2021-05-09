import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import EventContainer from '../EventContainerFolder/EventContainer.js';
import { abrirModalInsertar } from '../EventContainerFolder/EventContainer.js';
import { useHistory } from "react-router-dom";


function Navbar() {
  let history = useHistory();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        <img src="images/EventCreator.png" width='140' height='55' alt="" />
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">Inicio<span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="#">Mis Eventos</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Tickets
        </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">Opción 1</a>
              <a className="dropdown-item" href="#">Opción 2</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">Opción 3</a>
            </div>
          </li>
          <li className="selectedcenter">
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Buscar Eventos..." aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
            </form>
          </li>
          <li className="selectedright">
            <a className="nav-link" href="/login" onClick={LogOut}>Cerrar Sesión</a>
          </li>
        </ul>
      </div>
    </nav>
  )

  function LogOut(event) {
    event.preventDefault();
    sessionStorage.removeItem('UserToken');
    history.push("/login");
  }
}


export default Navbar;