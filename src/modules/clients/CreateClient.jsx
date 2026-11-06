import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateClient.css";
import Swal from "sweetalert2";


function CreateClient() {

    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");
    const [direccion, setDireccion] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newClient = {
            id: crypto.randomUUID(),
            nombre: nombre.trim(),
            telefono: telefono.trim(),
            correo: correo.trim(),
            direccion: direccion.trim(),
            fecha_registro: new Date().toISOString()
        };

        const savedClients = JSON.parse(localStorage.getItem("clients")) || [];

        savedClients.push(newClient);

        localStorage.setItem("clients", JSON.stringify(savedClients));

        Swal.fire({
            title: "¡Cliente registrado!",
            text: "El cliente se ha registrado correctamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#43205f"
        }).then(() => {
            navigate("/clients/list");
        });
        
    };

    return (
        <div className="create-client">
            <h1>Registrar cliente</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nombre">Nombre completo</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="telefono">Teléfono</label>
                    <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="correo">Correo electrónico</label>
                    <input
                        type="email"
                        id="correo"
                        name="correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="direccion">Dirección</label>
                    <input
                        type="text"
                        id="direccion"
                        name="direccion"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                    />
                </div>

                <button type="submit">Registrar cliente</button>
            </form>
        </div>
    );
}

export default CreateClient;