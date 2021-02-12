import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';


function App() {

  const EventsData = [
    {id: 1, nombre: "Coldplay Concert", descripcion: "A marvelous concert of coldplay", inicio: "10:45", fin: "11:45", boletos: 550, fotografia: "Foto", ubicacion: "Guatemala, Ciudad Cayala"},
    {id: 2, nombre: "Imagine Dragons Concert", descripcion: "A marvelous concert of Imagine Dragons", inicio: "08:45", fin: "09:45", boletos: 1500, fotografia: "Foto", ubicacion: "Guatemala, Ciudad Cayala"},
  ];

  const [data, setData] = useState(EventsData);
  localStorage.setItem('Data',EventsData);
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

  const seleccionarEvento=(elemento, caso)=>{
    seteventoSeleccionado(elemento);
    (caso==='Editar')?setModalEditar(true):setModalEliminar(true)
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    seteventoSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }));
  }

  const editar=()=>{
    var dataNueva=data;
    dataNueva.map(evento=>{
      if(evento.id===eventoSeleccionado.id){
        evento.nombre=eventoSeleccionado.nombre;
        evento.descripcion=eventoSeleccionado.descripcion;
        evento.inicio=eventoSeleccionado.inicio;
        evento.fin=eventoSeleccionado.fin;
        evento.boletos=eventoSeleccionado.boletos;
        evento.fotografia=eventoSeleccionado.fotografia;
        evento.ubicacion=eventoSeleccionado.ubicacion;
      }
    });
    setData(dataNueva);
    setModalEditar(false);
  }

  const eliminar =()=>{
    setData(data.filter(evento=>evento.id!==eventoSeleccionado.id));
    setModalEliminar(false);
  }

  const abrirModalInsertar=()=>{
    seteventoSeleccionado(null);
    setModalInsertar(true);
  }

  const insertar =()=>{
    var valorInsertar=eventoSeleccionado;
    valorInsertar.id=data[data.length-1].id+1;
    var dataNueva = data;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    setModalInsertar(false);
  }

  return (
    <div className="App">
      <h2>Eventing</h2>
      <br />
    <button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Insertar</button>
    <br /><br />
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
        <tbody>
          {data.map(elemento=>(
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.nombre}</td>
              <td>{elemento.descripcion}</td>
              <td>{elemento.inicio}</td>
              <td>{elemento.fin}</td>
              <td>{elemento.boletos}</td>
              <td>{elemento.fotografia}</td>
              <td>{elemento.ubicacion}</td>
              <td><button className="btn btn-primary" onClick={()=>seleccionarEvento(elemento, 'Editar')}>Editar</button> {"   "} 
              <button className="btn btn-danger" onClick={()=>seleccionarEvento(elemento, 'Eliminar')}>Eliminar</button></td>
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
          <button className="btn btn-primary" onClick={()=>editar()}>
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalEditar(false)}
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
          <button className="btn btn-danger" onClick={()=>eliminar()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>setModalEliminar(false)}
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
              value={data[data.length-1].id+1}
            />
            <br />

            <label>Evento</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={eventoSeleccionado ? eventoSeleccionado.nombre: ''}
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
          <button className="btn btn-primary"
          onClick={()=>insertar()}>
            Insertar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalInsertar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;