import { useState } from "react";
import "./EditOrder.css";

function EditOrder({ order, clients, onClose, onOrderUpdated }) {

    // Recuperar productos y servicios
    const [products] = useState(() => {
        return JSON.parse(localStorage.getItem("products") || "[]");
    });

    const [services] = useState(() => {
        return JSON.parse(localStorage.getItem("services") || "[]");
    });

    // Información general del pedido
    const [clientId, setClientId] = useState(order.clientId);
    const [date, setDate] = useState(order.date);
    const [deliveryStatus, setDeliveryStatus] = useState(order.deliveryStatus);
    const [observations, setObservations] = useState(order.observations || "");

    // Productos y servicios del pedido
    const [items, setItems] = useState(
        order.items.map((item) => ({ ...item }))
    );

    // Campos para agregar artículos
    const [itemType, setItemType] = useState("product");
    const [selectedItemId, setSelectedItemId] = useState("");
    const [quantity, setQuantity] = useState(1);

    const availableItems = itemType === "product" ? products : services;

    // Abonos registrados anteriormente
    const totalPaid = Number(order.totalPaid) || 0;

    // Calcular total y saldo
    const total = items.reduce(
        (sum, item) => sum + Number(item.subtotal),
        0
    );

    const balance = total - totalPaid;

    const paymentStatus =
        balance === 0
            ? "Pagado"
            : totalPaid > 0
                ? "Abonado"
                : "Pendiente";

    // Agregar producto o servicio
    const handleAddItem = () => {

        const selectedItem = availableItems.find(
            (item) => String(item.id) === selectedItemId
        );

        if (!selectedItem || Number(quantity) <= 0 ||
            !Number.isInteger(Number(quantity))) {
            alert("Selecciona un artículo y una cantidad válida.");
            return;
        }

        const unitPrice = Number(
            itemType === "product"
                ? selectedItem.salePrice
                : selectedItem.basePrice
        );

        if (!Number.isFinite(unitPrice) || unitPrice < 0) {
            alert("El artículo no tiene un precio válido.");
            return;
        }

        const newItem = {
            id: crypto.randomUUID(),
            itemId: selectedItem.id,
            type: itemType,
            name: selectedItem.name,
            quantity: Number(quantity),
            unitPrice,
            subtotal: unitPrice * Number(quantity)
        };

        setItems((prevItems) => [...prevItems, newItem]);

        setSelectedItemId("");
        setQuantity(1);
    };

    // Cambiar cantidad de un artículo
    const handleQuantityChange = (id, newQuantity) => {
        const value = Number(newQuantity);

        if (!Number.isInteger(value) || value < 1) {
            return;
        }

        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: value,
                        subtotal: Number(item.unitPrice) * value
                    }
                    : item
            )
        );
    };

    // Eliminar artículo
    const handleRemoveItem = (id) => {
        setItems((prevItems) =>
            prevItems.filter((item) => item.id !== id)
        );
    };

    // Guardar cambios
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!clientId || !date) {
            alert("Completa los campos obligatorios.");
            return;
        }

        if (items.length === 0) {
            alert("El pedido debe contener al menos un artículo.");
            return;
        }

        if (total < totalPaid) {
            alert(
                "El total del pedido no puede ser menor que los abonos realizados."
            );
            return;
        }

        const updatedOrder = {
            ...order,
            clientId,
            date,
            deliveryStatus,
            observations,
            items,
            total,
            totalPaid,
            balance,
            paymentStatus
        };

        onOrderUpdated(updatedOrder);
        onClose();
    };

    return (
        <div className="edit-order">

            <h2>Editar pedido</h2>

            <form onSubmit={handleSubmit}>

                {/* Cliente */}
                <div className="edit-order-field">
                    <label>Cliente</label>

                    <select
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                        required
                    >
                        <option value="">Selecciona un cliente</option>

                        {clients.map((client) => (
                            <option key={client.id} value={client.id}>
                                {client.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Fecha */}
                <div className="edit-order-field">
                    <label>Fecha del pedido</label>

                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                {/* Agregar productos o servicios */}
                <h3>Productos y servicios</h3>

                <div className="edit-order-field">
                    <label>Tipo de artículo</label>

                    <select
                        value={itemType}
                        onChange={(e) => {
                            setItemType(e.target.value);
                            setSelectedItemId("");
                        }}
                    >
                        <option value="product">Producto</option>
                        <option value="service">Servicio</option>
                    </select>
                </div>

                <div className="edit-order-field">
                    <label>Seleccionar artículo</label>

                    <select
                        value={selectedItemId}
                        onChange={(e) => setSelectedItemId(e.target.value)}
                    >
                        <option value="">Selecciona una opción</option>

                        {availableItems.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="edit-order-field">
                    <label>Cantidad</label>

                    <input
                        type="number"
                        min="1"
                        step="1"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>

                <button
                    type="button"
                    className="edit-order-add"
                    onClick={handleAddItem}
                >
                    + Agregar artículo
                </button>

                {/* Artículos registrados */}
                <h3>Detalle del pedido</h3>

                <div className="edit-order-table-container">
                    <table className="edit-order-table">
                        <thead>
                            <tr>
                                <th>Artículo</th>
                                <th>Precio unitario</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                                <th>Acción</th>
                            </tr>
                        </thead>

                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>

                                    <td>
                                        ${Number(item.unitPrice).toLocaleString("es-CO")}
                                    </td>

                                    <td>
                                        <input
                                            type="number"
                                            min="1"
                                            step="1"
                                            value={item.quantity}
                                            onChange={(e) =>
                                                handleQuantityChange(
                                                    item.id,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </td>

                                    <td>
                                        ${Number(item.subtotal).toLocaleString("es-CO")}
                                    </td>

                                    <td>
                                        <button
                                            type="button"
                                            className="edit-order-remove"
                                            onClick={() => handleRemoveItem(item.id)}
                                        >
                                            Quitar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Información financiera */}
                <h3>Resumen del pedido</h3>

                <div className="edit-order-summary">
                    <p>
                        <strong>Total:</strong>{" "}
                        ${total.toLocaleString("es-CO")}
                    </p>

                    <p>
                        <strong>Abonado:</strong>{" "}
                        ${totalPaid.toLocaleString("es-CO")}
                    </p>

                    <p>
                        <strong>Saldo pendiente:</strong>{" "}
                        ${balance.toLocaleString("es-CO")}
                    </p>

                    <p>
                        <strong>Estado de pago:</strong> {paymentStatus}
                    </p>
                </div>

                {/* Estado de entrega */}
                <div className="edit-order-field">
                    <label>Estado de entrega</label>

                    <select
                        value={deliveryStatus}
                        onChange={(e) => setDeliveryStatus(e.target.value)}
                    >
                        <option value="Pendiente">Pendiente</option>
                        <option value="En proceso">En proceso</option>
                        <option value="Entregado">Entregado</option>
                        <option value="Cancelado">Cancelado</option>
                    </select>
                </div>

                {/* Observaciones */}
                <div className="edit-order-field">
                    <label>Observaciones</label>

                    <textarea
                        value={observations}
                        onChange={(e) => setObservations(e.target.value)}
                        rows="4"
                    />
                </div>

                {/* Botones */}
                <div className="edit-order-buttons">
                    <button
                        type="button"
                        className="edit-order-cancel"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        className="edit-order-save"
                    >
                        Guardar cambios
                    </button>
                </div>

            </form>
        </div>
    );
}

export default EditOrder;

