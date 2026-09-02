import "./CreateRole.css";

function CreateRole() {
    return (
        <div className="create-role-overlay">
            <div className="create-role-modal">

                <h2>Crear nuevo rol</h2>

                <label htmlFor="role-name">
                    Rol
                </label>

                <input
                    id="role-name"
                    type="text"
                    placeholder="Ej: Vendedor"
                />

                <div className="role-status-section">
                    <span>Estado</span>

                    <div className="role-status-control">
                        <div className="role-switch">
                            <div className="role-switch-circle"></div>
                        </div>

                        <span>Activo</span>
                    </div>
                </div>

                <label htmlFor="role-description">
                    Descripción
                </label>

                <textarea
                    id="role-description"
                    placeholder="Escribe una descripción del rol"
                ></textarea>

                <div className="create-role-actions">
                    <button className="cancel-btn">
                        Cancelar
                    </button>

                    <button className="save-btn">
                        Guardar
                    </button>
                </div>

            </div>
        </div>
    );
}

export default CreateRole;