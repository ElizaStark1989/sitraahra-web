import "./Products.css";
import { useState } from "react";
import ProductList from "./ProductList";
import CreateProduct from "./CreateProduct";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";

function Products() {

    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem("products");
        return savedProducts ? JSON.parse(savedProducts) : [];
    });

    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalMode, setModalMode] = useState("create");

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    // Cerrar la ventana modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
        setModalMode("create");
    };

    // Registrar un producto
    const handleProductCreated = (newProduct) => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
    };

    // Seleccionar un producto para editar
    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setModalMode("edit");
        setShowModal(true);
    };

    // Actualizar un producto
    const handleProductUpdated = (updatedProduct) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === updatedProduct.id
                    ? updatedProduct
                    : product
            )
        );
    };

    // Seleccionar un producto para eliminar
    const handleDeleteProduct = (product) => {
        setSelectedProduct(product);
        setModalMode("delete");
        setShowModal(true);
    };

    // Actualizar la lista después de eliminar un producto
    const handleProductDeleted = (productId) => {
        setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
        );
    };

    return (
        <div className="products">
            <div className="products-content">

                <header className="products-header">
                    <h1>Gestión de Productos</h1>
                    <p>Administra los productos de SitraAhra.</p>
                </header>

                <div className="products-actions">
                    <button
                        className="products-create-button"
                        onClick={() => {
                            setSelectedProduct(null);
                            setModalMode("create");
                            setShowModal(true);
                        }}
                    >
                        + Registrar Producto
                    </button>
                </div>

                <div className="products-search">
                    <span className="search-icon">🔍</span>

                    <input
                        type="text"
                        placeholder="Buscar producto por nombre..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <ProductList
                    products={filteredProducts}
                    onEdit={handleEditProduct}
                    onDelete={handleDeleteProduct}
                />

            </div>

            {showModal && (
                <div className="product-modal-overlay">
                    <div className="product-modal">

                        <button
                            className="product-modal-close"
                            onClick={handleCloseModal}
                            aria-label="Cerrar ventana"
                        >
                            ×
                        </button>

                        {modalMode === "edit" && selectedProduct ? (
                            <EditProduct
                                product={selectedProduct}
                                onClose={handleCloseModal}
                                onProductUpdated={handleProductUpdated}
                            />
                        ) : modalMode === "delete" && selectedProduct ? (
                            <DeleteProduct
                                product={selectedProduct}
                                onClose={handleCloseModal}
                                onProductDeleted={handleProductDeleted}
                            />
                        ) : (
                            <CreateProduct
                                onClose={handleCloseModal}
                                onProductCreated={handleProductCreated}
                            />
                        )}

                    </div>
                </div>
            )}

        </div>
    );
}

export default Products;

