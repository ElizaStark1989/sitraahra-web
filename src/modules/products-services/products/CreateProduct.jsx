import "./CreateProduct.css";
import { useState } from "react";
import Swal from "sweetalert2";

function CreateProduct({ onClose, onProductCreated }) {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        salePrice: "",
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

        const savedProducts = JSON.parse(
            localStorage.getItem("products") || "[]"
        );

        const newProduct = {
            id: Date.now(),
            name: formData.name.trim(),
            description: formData.description.trim(),
            salePrice: Number(formData.salePrice),
            status: formData.status
        };

        const updatedProducts = [...savedProducts, newProduct];

        localStorage.setItem(
            "products",
            JSON.stringify(updatedProducts)
        );

        Swal.fire({
            icon: "success",
            title: "¡Producto registrado!",
            text: "El producto se ha guardado correctamente.",
            confirmButtonColor: "#5b347a"
        }).then(() => {
            onProductCreated(newProduct);
            onClose();
        });
    };

    return (
        <div className="create-product-content">

            <header className="create-product-header">
                <h1>Registrar Producto</h1>
                <p>Completa la información del nuevo producto.</p>
            </header>

            <form
                className="create-product-form"
                onSubmit={handleSubmit}
            >

                <div className="create-product-field">
                    <label htmlFor="name">
                        Nombre del producto *
                    </label>

                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ingresa el nombre del producto"
                        required
                    />
                </div>

                <div className="create-product-field">
                    <label htmlFor="description">
                        Descripción
                    </label>

                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe el producto (opcional)"
                        rows="4"
                    />
                </div>

                <div className="create-product-field">
                    <label htmlFor="salePrice">
                        Precio de venta (COP) *
                    </label>

                    <input
                        type="number"
                        id="salePrice"
                        name="salePrice"
                        value={formData.salePrice}
                        onChange={handleChange}
                        placeholder="Ejemplo: 50000"
                        min="1"
                        step="1"
                        required
                    />
                </div>

                <div className="create-product-field">
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

                <div className="create-product-actions">

                    <button
                        type="button"
                        className="create-product-cancel"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        className="create-product-save"
                    >
                        Guardar Producto
                    </button>

                </div>

            </form>

        </div>
    );
}

export default CreateProduct;