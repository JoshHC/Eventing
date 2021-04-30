import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import EventTable from '../EventTableFolder/EventTable';
import axios from 'axios';


sessionStorage.getItem('UserToken');
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTk4MDM4MzgsImV4cCI6MTYxOTgwNzQzOH0.4D9I9S6DaF0PyKAk0plwRS1hQ6yXd7Bw51egF6Torbo'
}


function EventContainer() {

  var [eventlist, setData] = useState(JSON.parse(localStorage.getItem('EventData')));

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
    await axios.patch(process.env.REACT_APP_EVENTS + eventoSeleccionado.id, params, {headers});
    setModalEditar(false);
  }

  const eliminar = async () => {
    setModalEliminar(false);
    console.log(eventoSeleccionado.id);
    await axios.delete(process.env.REACT_APP_EVENTS + eventoSeleccionado.id, {headers});
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
    await axios.post(process.env.REACT_APP_EVENTS, params, {headers})
    setModalInsertar(false);
  }

  const [EventList, setEventList] = useState([]);
  useEffect(async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_EVENTS, { headers })
      setEventList(res.data);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="App">
      <br />
      <div className="rightalign">
        <button className="btn btn-success green" onClick={() => abrirModalInsertar()}>Crear Evento</button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Boletos</th>
            <th>Fotografia</th>
            <th>Ubicacion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className='table'>
          {EventList.map((elemento, i) => (
            <tr key={i}>
              <td>{elemento.id}</td>
              <td>{elemento.nombre}</td>
              <td>{elemento.descripcion}</td>
              <td>{elemento.inicio}</td>
              <td>{elemento.fin}</td>
              <td>{elemento.boletos}</td>
              <td><img className="tableimage" src={elemento.fotografia} alt="Responsive image" /></td>
              <td>{elemento.ubicacion}</td>
              <td><button className="btn btn-primary" onClick={() => seleccionarEvento(elemento, 'Editar')}>Editar</button> {"   "}
                <button className="btn btn-danger" onClick={() => seleccionarEvento(elemento, 'Eliminar')}>Eliminar</button></td>
            </tr>
          ))
          }
        </tbody>
      </table>

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
              value={eventlist[eventlist.length - 1].id + 1}
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
    </div>
  );
}

export default EventContainer;
