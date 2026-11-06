import { useState } from "react";
import "./ClientList.css";
import { Link } from "react-router-dom";

function ClientList() {
    const [clients] = useState(() => {
        return JSON.parse(localStorage.getItem("clients")) || [];
    });

    const [search, setSearch] = useState("");
    console.log("Texto de búsqueda:", search);

    const filteredClients = clients.filter((client) => {
        const searchText = search.toLowerCase().trim();

        return (
            client.nombre.toLowerCase().includes(searchText) ||
            (client.telefono || "").includes(searchText) ||
            (client.correo || "").toLowerCase().includes(searchText)
        );
    });


    return (
        <div className="client-list">

            <h1>Consultar clientes</h1>

            <div className="client-search">

                <span className="search-icon" aria-hidden="true">🔍</span>

                <input
                    type="search"
                    placeholder="Buscar por nombre, teléfono o correo"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    aria-label="Buscar clientes"
                />
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Correo</th>
                        <th>Dirección</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredClients.map((client) => (
                        <tr key={client.id}>
                            <td>{client.nombre}</td>
                            <td>{client.telefono}</td>
                            <td>{client.correo}</td>
                            <td>{client.direccion}</td>
                            <td>
                                <Link to={`/clients/edit/${client.id}`}>
                                    <button type="button">Editar</button>
                                </Link>

                                <Link to={`/clients/delete/${client.id}`}>
                                    <button type="button">Eliminar</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ClientList;