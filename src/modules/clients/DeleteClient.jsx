import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";


function DeleteClient() {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const savedClients = JSON.parse(localStorage.getItem("clients")) || [];
        const client = savedClients.find((client) => client.id === id);

        if (!client) {
            Swal.fire({
                title: "Cliente no encontrado",
                icon: "error",
                confirmButtonColor: "#43205f"
            }).then(() => navigate("/clients/list"));
            return;
        }

        Swal.fire({
            title: "¿Eliminar cliente?",
            text: `¿Estás segura de eliminar a ${client.nombre}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#b3261e",
            cancelButtonColor: "#43205f",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedClients = savedClients.filter(
                    (savedClient) => savedClient.id !== id
                );

                localStorage.setItem("clients", JSON.stringify(updatedClients));

                Swal.fire({
                    title: "¡Cliente eliminado!",
                    text: "El cliente se eliminó correctamente.",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#43205f"
                }).then(() => navigate("/clients/list"));
            } else {
                navigate("/clients/list");
            }
        });
    }, [id, navigate]);

    return null;
}

export default DeleteClient;