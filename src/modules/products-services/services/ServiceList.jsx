import "./ServiceList.css";

function ServiceList({ services, onEdit, onDelete }) {
    return (
        <div className="service-list">
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio base</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {services.map((service) => (
                        <tr key={service.id}>
                            <td>{service.name}</td>
                            <td>{service.description}</td>
                            <td>{service.basePrice}</td>
                            <td>{service.status}</td>

                            <td>
                                <button
                                    type="button"
                                    onClick={() => onEdit(service)}
                                >
                                    Editar
                                </button>

                                <button
                                    type="button"
                                    onClick={() => onDelete(service)}
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

export default ServiceList;