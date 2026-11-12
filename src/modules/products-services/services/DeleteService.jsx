import "./DeleteService.css";
import Swal from "sweetalert2";

function DeleteService({ service, onClose, onServiceDeleted }) {

    const handleDelete = () => {

        onServiceDeleted(service.id);

        Swal.fire({
            icon: "success",
            title: "¡Servicio eliminado!",
            text: "El servicio se eliminó correctamente.",
            confirmButtonColor: "#5b347a"
        }).then(() => {
            onClose();
        });
    };

    return (
        <div className="delete-service-content">

            <h2>Eliminar servicio</h2>

            <p>
                ¿Estás segura de que deseas eliminar
                el servicio <strong>{service.name}</strong>?
            </p>

            <div className="delete-service-actions">

                <button
                    type="button"
                    className="delete-service-cancel"
                    onClick={onClose}
                >
                    Cancelar
                </button>

                <button
                    type="button"
                    className="delete-service-confirm"
                    onClick={handleDelete}
                >
                    Sí, eliminar
                </button>

            </div>

        </div>
    );
}

export default DeleteService;