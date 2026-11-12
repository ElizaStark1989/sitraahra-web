import Swal from "sweetalert2";

const DeleteOrder = async (order, onOrderDeleted) => {

    const result = await Swal.fire({
        title: "¿Eliminar pedido?",
        text: `¿Estás segura de eliminar el pedido N.º ${String(order.id).slice(0, 8)}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#5b347a",
        cancelButtonColor: "#d4af37",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    });

    if (result.isConfirmed) {

        onOrderDeleted(order.id);

        await Swal.fire({
            title: "¡Pedido eliminado!",
            text: "El pedido se eliminó correctamente.",
            icon: "success",
            confirmButtonColor: "#5b347a"
        });
    }
};

export default DeleteOrder;