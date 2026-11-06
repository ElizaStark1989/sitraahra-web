import "./EditClient.css";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function EditClient() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [client, setClient] = useState(() => {
        const savedClients = JSON.parse(localStorage.getItem("clients")) || [];

        return savedClients.find((client) => client.id === id) || null;
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setClient({
            ...client,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const savedClients = JSON.parse(localStorage.getItem("clients")) || [];

        const updatedClients = savedClients.map((savedClient) =>
            savedClient.id === id
                ? {
                    ...client,
                    nombre: client.nombre.trim(),
                    telefono: client.telefono.trim(),
                    correo: client.correo.trim(),
                    direccion: client.direccion.trim()
                }
                : savedClient
        );

        localStorage.setItem("clients", JSON.stringify(updatedClients));

        Swal.fire({
            title: "¡Cliente actualizado!",
            text: "Los datos del cliente se actualizaron correctamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#43205f",
            allowOutsideClick: false
        }).then(() => {
            navigate("/clients/list");
        });
    };

    return (
        <div className="edit-client">
            <h1>Editar cliente</h1>

            {client ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="nombre">Nombre completo</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={client.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="telefono">Teléfono</label>
                        <input
                            type="tel"
                            id="telefono"
                            name="telefono"
                            value={client.telefono}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="correo">Correo electrónico</label>
                        <input
                            type="email"
                            id="correo"
                            name="correo"
                            value={client.correo}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="direccion">Dirección</label>
                        <input
                            type="text"
                            id="direccion"
                            name="direccion"
                            value={client.direccion}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit">Guardar cambios</button>
                </form>
            ) : (
                <p>Cliente no encontrado.</p>
            )}
        </div>
    );
}

export default EditClient;
