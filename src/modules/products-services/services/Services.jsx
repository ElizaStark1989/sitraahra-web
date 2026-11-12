import "./Services.css";
import { useState, useEffect } from "react";
import CreateService from "./CreateService";
import ServiceList from "./ServiceList";
import EditService from "./EditService";
import DeleteService from "./DeleteService";

function Services() {

    const [services, setServices] = useState(() => {
        const savedServices = localStorage.getItem("services");
        return savedServices ? JSON.parse(savedServices) : [];
    });

    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [modalMode, setModalMode] = useState("create");

    const filteredServices = services.filter((service) =>
        service.name.toLowerCase().includes(search.toLowerCase().trim())
    );

    useEffect(() => {
        localStorage.setItem("services", JSON.stringify(services));
    }, [services]);

    // Cerrar la ventana modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedService(null);
        setModalMode("create");
    };

    // Registrar un servicio
    const handleServiceCreated = (newService) => {
        setServices((prevServices) => [...prevServices, newService]);
    };

    // Seleccionar un servicio para editar
    const handleEditService = (service) => {
        setSelectedService(service);
        setModalMode("edit");
        setShowModal(true);
    };

    // Actualizar un servicio
    const handleServiceUpdated = (updatedService) => {
        setServices((prevServices) =>
            prevServices.map((service) =>
                service.id === updatedService.id
                    ? updatedService
                    : service
            )
        );
    };

    // Seleccionar un servicio para eliminar
    const handleDeleteService = (service) => {
        setSelectedService(service);
        setModalMode("delete");
        setShowModal(true);
    };

    // Actualizar la lista después de eliminar un servicio
    const handleServiceDeleted = (serviceId) => {
        setServices((prevServices) =>
            prevServices.filter((service) => service.id !== serviceId)
        );
    };

    return (
        <div className="services">
            <div className="services-content">

                <header className="services-header">
                    <h1>Gestión de Servicios</h1>
                    <p>Administra los servicios de SitraAhra.</p>
                </header>

                <div className="services-actions">
                    <button
                        className="services-create-button"
                        onClick={() => {
                            setSelectedService(null);
                            setModalMode("create");
                            setShowModal(true);
                        }}
                    >
                        + Registrar Servicio
                    </button>
                </div>

                <div className="services-search">
                    <span className="search-icon">🔍</span>

                    <input
                        type="text"
                        placeholder="Buscar servicio por nombre..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                <ServiceList
                    services={filteredServices}
                    onEdit={handleEditService}
                    onDelete={handleDeleteService}
                />

            </div>

            {showModal && (
                <div className="service-modal-overlay">
                    <div className="service-modal">

                        <button
                            className="service-modal-close"
                            onClick={handleCloseModal}
                            aria-label="Cerrar ventana"
                        >
                            ×
                        </button>

                        {modalMode === "edit" && selectedService ? (
                            <EditService
                                service={selectedService}
                                onClose={handleCloseModal}
                                onServiceUpdated={handleServiceUpdated}
                            />
                        ) : modalMode === "delete" && selectedService ? (
                            <DeleteService
                                service={selectedService}
                                onClose={handleCloseModal}
                                onServiceDeleted={handleServiceDeleted}
                            />
                        ) : (
                            <CreateService
                                onClose={handleCloseModal}
                                onServiceCreated={handleServiceCreated}
                            />
                        )}

                    </div>
                </div>
            )}

        </div>
    );
}

export default Services;