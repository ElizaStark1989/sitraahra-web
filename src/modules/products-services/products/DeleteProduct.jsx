import "./DeleteProduct.css";
import Swal from "sweetalert2";

function DeleteProduct({ product, onClose, onProductDeleted }) {

    const handleDelete = async () => {

        const result = await Swal.fire({
            title: "¿Eliminar producto?",
            text: `¿Estás segura de que deseas eliminar "${product.name}"? Esta acción no se puede deshacer.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#a83232",
            cancelButtonColor: "#5b347a",
            reverseButtons: true
        });

        if (result.isConfirmed) {

            const savedProducts = JSON.parse(
                localStorage.getItem("products") || "[]"
            );

            const updatedProducts = savedProducts.filter(
                (item) => item.id !== product.id
            );

            localStorage.setItem(
                "products",
                JSON.stringify(updatedProducts)
            );

            await Swal.fire({
                icon: "success",
                title: "¡Producto eliminado!",
                text: "El producto se eliminó correctamente.",
                confirmButtonColor: "#5b347a"
            });

            onProductDeleted(product.id);
            onClose();
        }
    };

    return (
        <div className="delete-product-content">

            <header className="delete-product-header">
                <h1>Eliminar Producto</h1>
                <p>Estás a punto de eliminar el siguiente producto.</p>
            </header>

            <div className="delete-product-info">
                <h3>{product.name}</h3>

                <p>
                    {product.description || "Sin descripción"}
                </p>

                <span>
                    Estado: {product.status || "Activo"}
                </span>
            </div>

            <div className="delete-product-actions">

                <button
                    type="button"
                    className="delete-product-cancel"
                    onClick={onClose}
                >
                    Cancelar
                </button>

                <button
                    type="button"
                    className="delete-product-confirm"
                    onClick={handleDelete}
                >
                    Eliminar Producto
                </button>

            </div>

        </div>
    );
}

export default DeleteProduct;
