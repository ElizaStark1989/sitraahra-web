import "./DeleteUser.css";

function DeleteUser () {
    return (
        <div className="delete-user">

            <div className="delete-user-card">
                <h1>Eliminar usuario</h1>

                <p>
                    ¿Está seguro de que desea eliminar al usuario
                    <strong> María Gómez</strong>?
                </p>

                <p className="delete-warning">
                    Esta acción no se puede deshacer.
                </p>

                <div className="delete-actions">
                    <button>Cancelar</button>
                    <button>Eliminar</button>
                </div>
            </div>

        </div>
    )
};

export default DeleteUser;