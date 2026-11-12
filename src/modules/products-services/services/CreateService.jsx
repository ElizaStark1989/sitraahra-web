import "./CreateService.css";
import { useState } from "react";
import Swal from "sweetalert2";

function CreateService({ onClose, onServiceCreated }) {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        basePrice: "",
        status: "Activo"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const savedServices = JSON.parse(
            localStorage.getItem("services") || "[]"
        );

        const newService = {
            id: Date.now(),
            name: formData.name.trim(),
            description: formData.description.trim(),
            basePrice: Number(formData.basePrice),
            status: formData.status
        };

        const updatedServices = [...savedServices, newService];

        localStorage.setItem(
            "services",
            JSON.stringify(updatedServices)
        );

        Swal.fire({
            icon: "success",
            title: "¡Servicio registrado!",
            text: "El servicio se ha guardado correctamente.",
            confirmButtonColor: "#5b347a"
        }).then(() => {
            onServiceCreated(newService);
            onClose();
        });
    };

    return (
        <div className="create-service-content">

            <header className="create-service-header">
                <h1>Registrar Servicio</h1>
                <p>Completa la información del nuevo servicio.</p>
            </header>

            <form
                className="create-service-form"
                onSubmit={handleSubmit}
            >

                <div className="create-service-field">
                    <label htmlFor="name">
                        Nombre del servicio *
                    </label>

                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ingresa el nombre del servicio"
                        required
                    />
                </div>

                <div className="create-service-field">
                    <label htmlFor="description">
                        Descripción
                    </label>

                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe el servicio (opcional)"
                        rows="4"
                    />
                </div>

                <div className="create-service-field">
                    <label htmlFor="basePrice">
                        Precio base (COP) *
                    </label>

                    <input
                        type="number"
                        id="basePrice"
                        name="basePrice"
                        value={formData.basePrice}
                        onChange={handleChange}
                        placeholder="Ejemplo: 50000"
                        min="1"
                        step="1"
                        required
                    />
                </div>

                <div className="create-service-field">
                    <label htmlFor="status">
                        Estado
                    </label>

                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>
                </div>

                <div className="create-service-actions">

                    <button
                        type="button"
                        className="create-service-cancel"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        className="create-service-save"
                    >
                        Guardar Servicio
                    </button>

                </div>

            </form>

        </div>
    );
}

export default CreateService;