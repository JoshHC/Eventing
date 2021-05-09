import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import EventTable from '../EventTableFolder/EventTable';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'


function EventContainer() {

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem('UserToken')
  }

  let history = useHistory();

  //Creación de las vistas modales
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  const [eventoSeleccionado, seteventoSeleccionado] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    inicio: '',
    fin: '',
    boletos: '',
    fotografia: '',
    ubicacion: ''
  });

  const seleccionarEvento = (elemento, caso) => {
    seteventoSeleccionado(elemento);
    (caso === 'Editar') ? setModalEditar(true) : setModalEliminar(true)
  }

  const handleChange = e => {
    const { name, value } = e.target;
    seteventoSeleccionado((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const editar = async () => {
    console.log("Editar")
    const params = {
      id: eventoSeleccionado.id,
      nombre: eventoSeleccionado.nombre,
      descripcion: eventoSeleccionado.descripcion,
      inicio: eventoSeleccionado.inicio,
      fin: eventoSeleccionado.fin,
      boletos: eventoSeleccionado.boletos,
      fotografia: eventoSeleccionado.fotografia,
      ubicacion: eventoSeleccionado.ubicacion
    }
    const res = await axios.patch(process.env.REACT_APP_EVENTS + eventoSeleccionado.id, params, { headers });
    console.log(res);
    const resget = await axios.get(process.env.REACT_APP_EVENTS, { headers })
    setEventList(resget.data);
    setModalEditar(false);
  }

  const eliminar = async () => {
    console.log(eventoSeleccionado.id);
    console.log(headers);
    const res = await axios.delete(process.env.REACT_APP_EVENTS + eventoSeleccionado.id, { headers });
    console.log(res);
    EventList.pop(eventoSeleccionado);
    setEventList(EventList);
    setModalEliminar(false);
  }

  const abrirModalInsertar = () => {
    seteventoSeleccionado(null);
    setModalInsertar(true);
  }

  const insertar = async () => {
    const params = {
      id: eventoSeleccionado.id,
      nombre: eventoSeleccionado.nombre,
      descripcion: eventoSeleccionado.descripcion,
      inicio: eventoSeleccionado.inicio,
      fin: eventoSeleccionado.fin,
      boletos: eventoSeleccionado.boletos,
      fotografia: eventoSeleccionado.fotografia,
      ubicacion: eventoSeleccionado.ubicacion
    }
    const res = await axios.post(process.env.REACT_APP_EVENTS, params, { headers })
    EventList.push(params);
    setEventList(EventList);
    console.log(res);
    setModalInsertar(false);
  }

  const [EventList, setEventList] = useState([]);
  useEffect(async () => {
    console.log(sessionStorage.getItem('UserToken'))
    if (sessionStorage.getItem('UserToken') != null) {
      try {
        const res = await axios.get(process.env.REACT_APP_EVENTS, { headers })
        console.log(res);
        console.log(headers);
        setEventList(res.data);
      } catch (error) {
        console.log(headers);
        console.log(error);
      }
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Acceso Denegado',
        text: 'No puede acceder al menú principal sin haberse autenticado',
        footer: '<a href>Auntentiquese para continuar</a>'
      })
      history.push("/login");
    }
  }, []);

  return (
    <div className="App">
      <br />
      <div className="rightalign">
        <button className="btn btn-success green" onClick={() => abrirModalInsertar()}>Crear Evento</button>
      </div>
      <div className='separator'>
        <div className="card rounded shadow shadow-sm">
          <div className="card-header">
            <h3 className="mb-0">Eventos</h3>
          </div>
          <div className='container-fluid'>
            <div className="row">
              {EventList.map((elemento, i) => (
                <div key = {i} className="col-md-4">
                  <div className="card mb-4 box-shadow h-100">
                    <img className="card-img-top" src={elemento.fotografia} alt="Responsive image" />
                    <div className="card-body">
                      <h5 className="card-title">{elemento.nombre}</h5>
                      <p className="card-text">{elemento.descripcion}</p>
                      <button className="btn btn-success" onClick={() => seleccionarEvento(elemento, 'Editar')}>Editar</button> {"   "}
                      <button className="btn btn-danger" onClick={() => seleccionarEvento(elemento, 'Eliminar')}>Eliminar</button>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">Boletos: {elemento.boletos}</li>
                      <li className="list-group-item">Ubicación: {elemento.ubicacion}</li>
                    </ul>
                    <div className="card-footer text-muted">Inicio: {elemento.inicio}
                      <br />
                    Fin: {elemento.fin}
                    </div>
                  </div>
                  <br></br>
                </div>
              ))
              }
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Evento</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={eventoSeleccionado && eventoSeleccionado.id}
            />
            <br />

            <label>Evento</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={eventoSeleccionado && eventoSeleccionado.nombre}
              onChange={handleChange}
            />
            <br />

            <label>Descripcion</label>
            <input
              className="form-control"
              type="text"
              name="descripcion"
              value={eventoSeleccionado && eventoSeleccionado.descripcion}
              onChange={handleChange}
            />
            <br />

            <label>Inicio</label>
            <input
              className="form-control"
              type="text"
              name="inicio"
              value={eventoSeleccionado && eventoSeleccionado.inicio}
              onChange={handleChange}
            />
            <br />

            <label>Fin</label>
            <input
              className="form-control"
              type="text"
              name="fin"
              value={eventoSeleccionado && eventoSeleccionado.fin}
              onChange={handleChange}
            />
            <br />

            <label>Boletos</label>
            <input
              className="form-control"
              type="text"
              name="boletos"
              value={eventoSeleccionado && eventoSeleccionado.boletos}
              onChange={handleChange}
            />
            <br />

            <label>Fotografia</label>
            <input
              className="form-control"
              type="text"
              name="fotografia"
              value={eventoSeleccionado && eventoSeleccionado.fotografia}
              onChange={handleChange}
            />
            <br />

            <label>Ubicacion</label>
            <input
              className="form-control"
              type="text"
              name="ubicacion"
              value={eventoSeleccionado && eventoSeleccionado.ubicacion}
              onChange={handleChange}
            />
            <br />

          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => editar()}>
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Estás Seguro que deseas eliminar el Evento {eventoSeleccionado && eventoSeleccionado.nombre} ?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => eliminar()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Crear Evento</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={[EventList.length] + 1}
            />
            <br />

            <label>Evento</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={eventoSeleccionado ? eventoSeleccionado.nombre : ''}
              onChange={handleChange}
            />
            <br />

            <label>Descripcion</label>
            <input
              className="form-control"
              type="text"
              name="descripcion"
              value={eventoSeleccionado && eventoSeleccionado.descripcion}
              onChange={handleChange}
            />
            <br />

            <label>Inicio</label>
            <input
              className="form-control"
              type="text"
              name="inicio"
              value={eventoSeleccionado && eventoSeleccionado.inicio}
              onChange={handleChange}
            />
            <br />

            <label>Fin</label>
            <input
              className="form-control"
              type="text"
              name="fin"
              value={eventoSeleccionado && eventoSeleccionado.fin}
              onChange={handleChange}
            />
            <br />

            <label>Boletos</label>
            <input
              className="form-control"
              type="text"
              name="boletos"
              value={eventoSeleccionado && eventoSeleccionado.boletos}
              onChange={handleChange}
            />
            <br />

            <label>Fotografia (URL)</label>
            <input
              className="form-control"
              type="text"
              name="fotografia"
              value={eventoSeleccionado && eventoSeleccionado.fotografia}
              onChange={handleChange}
            />
            <br />

            <label>Ubicacion</label>
            <input
              className="form-control"
              type="text"
              name="ubicacion"
              value={eventoSeleccionado && eventoSeleccionado.ubicacion}
              onChange={handleChange}
            />
            <br />

          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary"
            onClick={() => insertar()}>
            Insertar
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setModalInsertar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div >
  );
}

export default EventContainer;
