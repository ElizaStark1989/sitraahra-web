function ProductList({ products, onEdit, onDelete }) {
    if (products.length === 0) {
        return (
            <div className="products-empty">
                <p>No hay productos registrados.</p>
            </div>
        );
    }

    return (
        <div className="products-table-container">
            <table className="products-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Precio de venta</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.category || "Sin categoría"}</td>
                            <td>
                                {Number(product.salePrice || 0).toLocaleString("es-CO", {
                                    style: "currency",
                                    currency: "COP",
                                    maximumFractionDigits: 0,
                                })}
                            </td>
                            <td>{product.status || "Activo"}</td>
                            <td className="products-actions-buttons">
                                <button
                                    type="button"
                                    className="products-edit-button"
                                    onClick={() => onEdit(product)}
                                >
                                    Editar
                                </button>

                                <button
                                    type="button"
                                    className="products-delete-button"
                                    onClick={() => onDelete(product)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;