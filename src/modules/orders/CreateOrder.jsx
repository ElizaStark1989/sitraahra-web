import "./CreateOrder.css";
import { useState } from "react";
import Swal from "sweetalert2";

function CreateOrder({ onClose, onOrderCreated }) {

    // Recuperar información registrada
    const [clients] = useState(() =>
        JSON.parse(localStorage.getItem("clients")) || []
    );

    const [products] = useState(() =>
        JSON.parse(localStorage.getItem("products")) || []
    );

    const [services] = useState(() =>
        JSON.parse(localStorage.getItem("services")) || []
    );

    // Datos del pedido
    const [clientId, setClientId] = useState("");
    const [orderDate, setOrderDate] = useState(() => {
        const date = new Date();
        const localDate = new Date(
            date.getTime() - date.getTimezoneOffset() * 60000
        );
        return localDate.toISOString().split("T")[0];
    });

    const [observations, setObservations] = useState("");
    const [deliveryStatus, setDeliveryStatus] = useState("Pendiente");

    // Selección de productos y servicios
    const [itemType, setItemType] = useState("product");
    const [selectedItemId, setSelectedItemId] = useState("");
    const [quantity, setQuantity] = useState(1);

    // Elementos agregados al pedido
    const [items, setItems] = useState([]);

    // Información del pago
    const [initialPayment, setInitialPayment] = useState("");

    // Mostrar productos o servicios según la selección
    const availableItems = itemType === "product"
        ? products
        : services;

    // Agregar un elemento al pedido
    const handleAddItem = () => {

        const selectedItem = availableItems.find(
            (item) => String(item.id) === selectedItemId
        );

        if (!selectedItem) {
            alert("Selecciona un producto o servicio.");
            return;
        }

        const price = Number(
            itemType === "product"
                ? selectedItem.salePrice
                : selectedItem.basePrice
        );

        if (!Number.isFinite(price) || price < 0) {
            alert("El elemento seleccionado no tiene un precio válido.");
            return;
        }

        const numericQuantity = Number(quantity);

        if (!Number.isInteger(numericQuantity) || numericQuantity <= 0) {
            alert("Ingresa una cantidad válida.");
            return;
        }

        const newItem = {
            id: crypto.randomUUID(),
            itemId: selectedItem.id,
            type: itemType,
            name: selectedItem.name,
            quantity: numericQuantity,
            unitPrice: price,
            subtotal: price * numericQuantity
        };

        setItems((previousItems) => [...previousItems, newItem]);

        setSelectedItemId("");
        setQuantity(1);
    };

    // Eliminar un elemento del detalle
    const handleRemoveItem = (id) => {
        setItems((previousItems) =>
            previousItems.filter((item) => item.id !== id)
        );
    };

    // Calcular valores
    const total = items.reduce(
        (accumulator, item) => accumulator + item.subtotal,
        0
    );

    const payment = initialPayment === ""
        ? 0
        : Number(initialPayment);

    const balance = total - payment;

    const paymentStatus = payment === 0
        ? "Pendiente"
        : payment >= total
            ? "Pagado"
            : "Abonado";

    // Guardar pedido
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!clientId) {
            alert("Debes seleccionar un cliente.");
            return;
        }

        if (items.length === 0) {
            alert("Debes agregar al menos un producto o servicio.");
            return;
        }

        if (!Number.isFinite(payment) || payment < 0 || payment > total) {
            alert("El abono debe estar entre cero y el total del pedido.");
            return;
        }

        const newOrder = {
            id: crypto.randomUUID(),
            clientId,
            date: orderDate,
            observations,
            items,
            total,
            totalPaid: payment,
            balance,
            paymentStatus,
            deliveryStatus,
            payments: payment > 0
                ? [{
                    id: crypto.randomUUID(),
                    amount: payment,
                    date: orderDate
                }]
                : []
        };

        onOrderCreated(newOrder);

        Swal.fire({
            title: "¡Pedido registrado!",
            text: "El pedido se ha registrado correctamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#5b347a"
        });

        onClose();
    };

    return (
        <div className="create-order">

            <h2>Registrar Pedido</h2>

            <form onSubmit={handleSubmit}>

                {/* INFORMACIÓN DEL CLIENTE */}

                <h3>Información del cliente</h3>

                <div className="create-order-field">
                    <label htmlFor="order-client">Cliente</label>

                    <select
                        id="order-client"
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                        required
                    >
                        <option value="">Seleccione un cliente</option>

                        {clients.map((client) => (
                            <option key={client.id} value={client.id}>
                                {client.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="create-order-field">
                    <label htmlFor="order-date">Fecha del pedido</label>

                    <input
                        id="order-date"
                        type="date"
                        value={orderDate}
                        onChange={(e) => setOrderDate(e.target.value)}
                        required
                    />
                </div>

                {/* PRODUCTOS Y SERVICIOS */}

                <h3>Productos y servicios</h3>

                <div className="create-order-field">
                    <label htmlFor="item-type">Tipo</label>

                    <select
                        id="item-type"
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

                <div className="create-order-field">
                    <label htmlFor="selected-item">
                        Seleccionar producto o servicio
                    </label>

                    <select
                        id="selected-item"
                        value={selectedItemId}
                        onChange={(e) => setSelectedItemId(e.target.value)}
                    >
                        <option value="">Seleccione una opción</option>

                        {availableItems.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="create-order-field">
                    <label htmlFor="item-quantity">Cantidad</label>

                    <input
                        id="item-quantity"
                        type="number"
                        min="1"
                        step="1"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>

                <button
                    type="button"
                    className="create-order-add-button"
                    onClick={handleAddItem}
                >
                    + Agregar al pedido
                </button>

                {/* DETALLE DEL PEDIDO */}

                <h3>Detalle del pedido</h3>

                <div className="create-order-table-container">
                    <table className="create-order-table">
                        <thead>
                            <tr>
                                <th>Elemento</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th>Subtotal</th>
                                <th>Acción</th>
                            </tr>
                        </thead>

                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.unitPrice.toLocaleString("es-CO")}</td>
                                    <td>${item.subtotal.toLocaleString("es-CO")}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="create-order-remove-button"
                                            onClick={() => handleRemoveItem(item.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {items.length === 0 && (
                                <tr>
                                    <td colSpan="5">
                                        No hay productos o servicios agregados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* INFORMACIÓN DEL PAGO */}

                <h3>Información del pago</h3>

                <div className="create-order-field">
                    <label htmlFor="initial-payment">Abono inicial</label>

                    <input
                        id="initial-payment"
                        type="number"
                        min="0"
                        max={total}
                        step="0.01"
                        value={initialPayment}
                        onChange={(e) => setInitialPayment(e.target.value)}
                    />
                </div>

                <div className="create-order-summary">
                    <p>
                        <strong>Total:</strong>
                        {" "}${total.toLocaleString("es-CO")}
                    </p>

                    <p>
                        <strong>Abonado:</strong>
                        {" "}${payment.toLocaleString("es-CO")}
                    </p>

                    <p>
                        <strong>Saldo pendiente:</strong>
                        {" "}${balance.toLocaleString("es-CO")}
                    </p>

                    <p>
                        <strong>Estado del pago:</strong>
                        {" "}{paymentStatus}
                    </p>
                </div>

                {/* ESTADO DEL PEDIDO */}

                <h3>Estado del pedido</h3>

                <div className="create-order-field">
                    <label htmlFor="delivery-status">Estado de entrega</label>

                    <select
                        id="delivery-status"
                        value={deliveryStatus}
                        onChange={(e) => setDeliveryStatus(e.target.value)}
                    >
                        <option value="Pendiente">Pendiente</option>
                        <option value="En proceso">En proceso</option>
                        <option value="Entregado">Entregado</option>
                        <option value="Cancelado">Cancelado</option>
                    </select>
                </div>

                <div className="create-order-field">
                    <label htmlFor="order-observations">Observaciones</label>

                    <textarea
                        id="order-observations"
                        value={observations}
                        onChange={(e) => setObservations(e.target.value)}
                        placeholder="Observaciones adicionales del pedido..."
                        rows="3"
                    />
                </div>

                {/* BOTONES */}

                <div className="create-order-actions">
                    <button type="button" onClick={onClose}>
                        Cancelar
                    </button>

                    <button type="submit">
                        Guardar Pedido
                    </button>
                </div>

            </form>
        </div>
    );
}

export default CreateOrder;

