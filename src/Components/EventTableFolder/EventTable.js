import React, { useState } from 'react';

export default function EventTable(seleccionarEvento) {
        const [EventList, setEventList] = useState(JSON.parse(localStorage.getItem('Data')));
    return (
        <div>
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
                    {EventList.map(elemento => (
                        <tr>
                            <td>{elemento.id}</td>
                            <td>{elemento.nombre}</td>
                            <td>{elemento.descripcion}</td>
                            <td>{elemento.inicio}</td>
                            <td>{elemento.fin}</td>
                            <td>{elemento.boletos}</td>
                            <td>{elemento.fotografia}</td>
                            <td>{elemento.ubicacion}</td>
                            <td><button className="btn btn-primary" onClick={() => seleccionarEvento(elemento, 'Editar')}>Editar</button> {"   "}
                                <button className="btn btn-danger" onClick={() => seleccionarEvento(elemento, 'Eliminar')}>Eliminar</button></td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}
