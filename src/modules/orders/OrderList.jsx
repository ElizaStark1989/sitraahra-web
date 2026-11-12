import "./OrderList.css";

function OrderList({
    orders,
    clients,
    onView,
    onEdit,
    onPayment,
    onDelete

}) {

    const getClientName = (clientId) => {
        const client = clients.find(
            (client) => String(client.id) === String(clientId)
        );

        return client ? client.nombre : "Cliente no encontrado";
    };

    return (
        <div className="order-list">

            <h2>Pedidos registrados</h2>

            <div className="order-list-table-container">
                <table className="order-list-table">
                    <thead>
                        <tr>
                            <th>N.º de pedido</th>
                            <th>Cliente</th>
                            <th>Fecha</th>
                            <th>Total</th>
                            <th>Abonado</th>
                            <th>Saldo</th>
                            <th>Estado de pago</th>
                            <th>Estado de entrega</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="9" className="order-list-empty">
                                    No hay pedidos registrados.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{String(order.id).slice(0, 8)}</td>

                                    <td>{getClientName(order.clientId)}</td>

                                    <td>{order.date}</td>

                                    <td>
                                        ${order.total.toLocaleString("es-CO")}
                                    </td>

                                    <td>
                                        ${order.totalPaid.toLocaleString("es-CO")}
                                    </td>

                                    <td>
                                        ${order.balance.toLocaleString("es-CO")}
                                    </td>

                                    <td>{order.paymentStatus}</td>

                                    <td>{order.deliveryStatus}</td>

                                    <td>
                                        <div className="order-list-actions">
                                            <button
                                                type="button"
                                                className="order-view-button"
                                                onClick={() => onView(order)}
                                            >
                                                Ver detalles
                                            </button>

                                            <button
                                                type="button"
                                                className="order-edit-button"
                                                onClick={() => onEdit(order)}
                                            >
                                                Editar
                                            </button>

                                            <button
                                                type="button"
                                                className="order-payment-button"
                                                onClick={() => onPayment(order)}
                                            >
                                                Abonar
                                            </button>

                                            <button
                                                type="button"
                                                className="order-delete-button"
                                                onClick={() => onDelete(order)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default OrderList;