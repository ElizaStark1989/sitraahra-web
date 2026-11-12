import "./OrderDetails.css";

function OrderDetails({ order, clients, onClose }) {

    const client = clients.find(
        (client) => String(client.id) === String(order.clientId)
    );

    const formatMoney = (value) => {
        return Number(value || 0).toLocaleString("es-CO");
    };

    return (
        <div className="order-details">

            <h2>Detalles del pedido</h2>

            {/* Información general */}
            <section className="order-details-section">

                <h3>Información general</h3>

                <p>
                    <strong>N.º de pedido:</strong>{" "}
                    {String(order.id).slice(0, 8)}
                </p>

                <p>
                    <strong>Cliente:</strong>{" "}
                    {client ? client.nombre : "Cliente no encontrado"}
                </p>

                <p>
                    <strong>Fecha:</strong> {order.date}
                </p>

                <p>
                    <strong>Estado de entrega:</strong>{" "}
                    {order.deliveryStatus}
                </p>

            </section>

            {/* Productos y servicios */}
            <section className="order-details-section">

                <h3>Productos y servicios</h3>

                <div className="order-details-table-container">
                    <table className="order-details-table">

                        <thead>
                            <tr>
                                <th>Artículo</th>
                                <th>Tipo</th>
                                <th>Cantidad</th>
                                <th>Precio unitario</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>

                        <tbody>
                            {(order.items || []).map((item) => (
                                <tr key={item.id}>

                                    <td>{item.name}</td>

                                    <td>
                                        {item.type === "product"
                                            ? "Producto"
                                            : "Servicio"}
                                    </td>

                                    <td>{item.quantity}</td>

                                    <td>
                                        ${formatMoney(item.unitPrice)}
                                    </td>

                                    <td>
                                        ${formatMoney(item.subtotal)}
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

            </section>

            {/* Resumen financiero */}
            <section className="order-details-section">

                <h3>Resumen financiero</h3>

                <div className="order-details-summary">

                    <p>
                        <strong>Total:</strong>{" "}
                        ${formatMoney(order.total)}
                    </p>

                    <p>
                        <strong>Abonado:</strong>{" "}
                        ${formatMoney(order.totalPaid)}
                    </p>

                    <p>
                        <strong>Saldo pendiente:</strong>{" "}
                        ${formatMoney(order.balance)}
                    </p>

                    <p>
                        <strong>Estado de pago:</strong>{" "}
                        {order.paymentStatus}
                    </p>

                </div>

            </section>

            {/* Historial de pagos */}
            <section className="order-details-section">

                <h3>Historial de pagos</h3>

                {order.payments?.length > 0 ? (

                    <div className="order-details-table-container">
                        <table className="order-details-table">

                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Valor abonado</th>
                                </tr>
                            </thead>

                            <tbody>
                                {order.payments.map((payment) => (
                                    <tr key={payment.id}>
                                        <td>{payment.date}</td>
                                        <td>
                                            ${formatMoney(payment.amount)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>

                ) : (
                    <p>No hay abonos registrados.</p>
                )}

            </section>

            {/* Observaciones */}
            <section className="order-details-section">

                <h3>Observaciones</h3>

                <p>
                    {order.observations || "Sin observaciones"}
                </p>

            </section>

            <div className="order-details-footer">
                <button type="button" onClick={onClose}>
                    Cerrar
                </button>
            </div>

        </div>
    );
}

export default OrderDetails;