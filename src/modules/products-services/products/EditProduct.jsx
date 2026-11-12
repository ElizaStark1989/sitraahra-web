import "./EditProduct.css";
import { useState } from "react";
import Swal from "sweetalert2";

function EditProduct({ product, onClose, onProductUpdated }) {

    const [formData, setFormData] = useState({
        name: product.name,
        description: product.description || "",
        salePrice: product.salePrice,
        status: product.status || "Activo"
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

        const savedProducts = JSON.parse(
            localStorage.getItem("products") || "[]"
        );

        const updatedProduct = {
            ...product,
            name: formData.name.trim(),
            description: formData.description.trim(),
            salePrice: Number(formData.salePrice),
            status: formData.status
        };

        const updatedProducts = savedProducts.map((item) =>
            item.id === product.id ? updatedProduct : item
        );

        localStorage.setItem(
            "products",
            JSON.stringify(updatedProducts)
        );

        Swal.fire({
            icon: "success",
            title: "¡Producto actualizado!",
            text: "Los cambios se guardaron correctamente.",
            confirmButtonColor: "#5b347a"
        }).then(() => {
            onProductUpdated(updatedProduct);
            onClose();
        });
    };

    return (
        <div className="edit-product-content">

            <header className="edit-product-header">
                <h1>Editar Producto</h1>
                <p>Modifica la información del producto.</p>
            </header>

            <form
                className="edit-product-form"
                onSubmit={handleSubmit}
            >

                <div className="edit-product-field">
                    <label htmlFor="edit-name">
                        Nombre del producto *
                    </label>

                    <input
                        type="text"
                        id="edit-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ingresa el nombre del producto"
                        required
                    />
                </div>

                <div className="edit-product-field">
                    <label htmlFor="edit-description">
                        Descripción
                    </label>

                    <textarea
                        id="edit-description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe el producto (opcional)"
                        rows="4"
                    />
                </div>

                <div className="edit-product-field">
                    <label htmlFor="edit-salePrice">
                        Precio de venta (COP) *
                    </label>

                    <input
                        type="number"
                        id="edit-salePrice"
                        name="salePrice"
                        value={formData.salePrice}
                        onChange={handleChange}
                        placeholder="Ejemplo: 50000"
                        min="1"
                        step="1"
                        required
                    />
                </div>

                <div className="edit-product-field">
                    <label htmlFor="edit-status">
                        Estado
                    </label>

                    <select
                        id="edit-status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>
                </div>

                <div className="edit-product-actions">

                    <button
                        type="button"
                        className="edit-product-cancel"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        className="edit-product-save"
                    >
                        Guardar Cambios
                    </button>

                </div>

            </form>

        </div>
    );
}

export default EditProduct;