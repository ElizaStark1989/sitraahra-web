import "./Orders.css";
import { useState, useEffect } from "react";
import CreateOrder from "./CreateOrder";
import OrderList from "./OrderList";
import EditOrder from "./EditOrder";
import OrderDetails from "./OrderDetails";
import DeleteOrder from "./DeleteOrder";


function Orders() {

    // Estado para almacenar los pedidos
    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem("orders");
        return savedOrders ? JSON.parse(savedOrders) : [];
    });

    // Recuperar clientes registrados
    const [clients] = useState(() => {
        const savedClients = localStorage.getItem("clients");
        return savedClients ? JSON.parse(savedClients) : [];
    });

    // Estado para el buscador
    const [search, setSearch] = useState("");

    // Estado para controlar la ventana modal
    const [showModal, setShowModal] = useState(false);

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    // Guardar los pedidos en localStorage
    useEffect(() => {
        localStorage.setItem("orders", JSON.stringify(orders));
    }, [orders]);

    // Función para registrar un nuevo pedido
    const handleOrderCreated = (newOrder) => {
        setOrders((prevOrders) => [...prevOrders, newOrder]);
    };

    const handleEditOrder = (order) => {
        setSelectedOrder(order);
        setShowEditModal(true);
    };

    // Mostrar detalles de un pedido
    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setShowDetailsModal(true);
    };

    const handleOrderUpdated = (updatedOrder) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === updatedOrder.id
                    ? updatedOrder
                    : order
            )
        );
    };

    const handleOrderDeleted = (orderId) => {
        setOrders((prevOrders) =>
            prevOrders.filter((order) => order.id !== orderId)
        );
    };

    const handleDeleteOrder = (order) => {
        DeleteOrder(order, handleOrderDeleted);
    };

    return (
        <>
            <div className="orders">
                <div className="orders-content">

                    {/* Encabezado */}
                    <header className="orders-header">
                        <h1>Gestión de Pedidos</h1>
                        <p>Administra los pedidos, pagos y entregas de SitraAhra.</p>
                    </header>

                    {/* Botón para registrar pedidos */}
                    <div className="orders-actions">
                        <button
                            className="orders-create-button"
                            onClick={() => setShowModal(true)}
                        >
                            + Registrar Pedido
                        </button>
                    </div>

                    {/* Buscador de pedidos */}
                    <div className="orders-search">
                        <span className="search-icon">🔍</span>

                        <input
                            type="text"
                            placeholder="Buscar pedido por número..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <OrderList
                        orders={orders.filter((order) =>
                            String(order.id).toLowerCase().includes(search.toLowerCase())
                        )}
                        clients={clients}
                        onEdit={handleEditOrder}
                        onView={handleViewOrder}
                        onDelete={handleDeleteOrder}
                    />

                </div>
            </div>

            {/* Ventana modal para registrar pedidos */}
            {showModal && (
                <div className="order-modal-overlay">
                    <div className="order-modal">

                        {/* Botón para cerrar la ventana */}
                        <button
                            className="order-modal-close"
                            onClick={() => setShowModal(false)}
                            aria-label="Cerrar ventana"
                        >
                            ×
                        </button>

                        <CreateOrder
                            onClose={() => setShowModal(false)}
                            onOrderCreated={handleOrderCreated}
                        />

                    </div>
                </div>
            )}
            {/* Ventana modal para editar pedidos */}
            {showEditModal && selectedOrder && (
                <div className="order-modal-overlay">
                    <div className="order-modal">

                        <button
                            className="order-modal-close"
                            onClick={() => setShowEditModal(false)}
                            aria-label="Cerrar ventana"
                        >
                            ×
                        </button>

                        <EditOrder
                            order={selectedOrder}
                            clients={clients}
                            onClose={() => setShowEditModal(false)}
                            onOrderUpdated={handleOrderUpdated}
                        />

                    </div>
                </div>
            )}
            {/* Ventana modal para consultar un pedido */}
            {showDetailsModal && selectedOrder && (
                <div className="order-modal-overlay">

                    <div className="order-modal">

                        <button
                            className="order-modal-close"
                            onClick={() => setShowDetailsModal(false)}
                            aria-label="Cerrar ventana"
                        >
                            ×
                        </button>

                        <OrderDetails
                            order={selectedOrder}
                            clients={clients}
                            onClose={() => setShowDetailsModal(false)}
                        />

                    </div>

                </div>
            )}
        </>
    );
}

export default Orders;