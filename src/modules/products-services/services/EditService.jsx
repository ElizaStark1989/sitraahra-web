import "./EditService.css";
import { useState } from "react";
import Swal from "sweetalert2";

function EditService({ service, onClose, onServiceUpdated }) {

    const [formData, setFormData] = useState({
        name: service.name,
        description: service.description,
        basePrice: service.basePrice,
        status: service.status
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

        const updatedService = {
            ...service,
            name: formData.name.trim(),
            description: formData.description.trim(),
            basePrice: Number(formData.basePrice),
            status: formData.status
        };

        onServiceUpdated(updatedService);

        Swal.fire({
            icon: "success",
            title: "¡Servicio actualizado!",
            text: "Los datos del servicio se actualizaron correctamente.",
            confirmButtonColor: "#5b347a"
        }).then(() => {
            onClose();
        });
    };

    return (
        <div className="edit-service-content">

            <header className="edit-service-header">
                <h1>Editar Servicio</h1>
                <p>Modifica la información del servicio.</p>
            </header>

            <form
                className="edit-service-form"
                onSubmit={handleSubmit}
            >

                <div className="edit-service-field">
                    <label htmlFor="name">
                        Nombre del servicio *
                    </label>

                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="edit-service-field">
                    <label htmlFor="description">
                        Descripción
                    </label>

                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                    />
                </div>

                <div className="edit-service-field">
                    <label htmlFor="basePrice">
                        Precio base (COP) *
                    </label>

                    <input
                        type="number"
                        id="basePrice"
                        name="basePrice"
                        value={formData.basePrice}
                        onChange={handleChange}
                        min="1"
                        step="1"
                        required
                    />
                </div>

                <div className="edit-service-field">
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

                <div className="edit-service-actions">

                    <button
                        type="button"
                        className="edit-service-cancel"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        className="edit-service-save"
                    >
                        Guardar cambios
                    </button>

                </div>

            </form>

        </div>
    );
}

export default EditService;