import "./EditUser.css";

function EditUser () {
    return (
        <div className="edit-user">
            <h1>Editar usuario</h1>

            <form className="edit-user-form">
                <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        defaultValue="María Gómez"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Correo</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        defaultValue="maria@email.com"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="role">Rol</label>
                    <select
                        id="role"
                        name="role"
                        defaultValue="admin"
                    >
                        <option value="admin">Administrador</option>
                        <option value="user">Usuario</option>
                    </select>
                </div>

                <button type="submit">Guardar Cambios</button>

            </form>
        </div>
    )
}

export default EditUser;