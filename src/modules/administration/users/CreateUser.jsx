import "./CreateUser.css";

function CreateUser () {
    return (
        <div className="create-user">
            <h1>Crear usuario</h1>

            <form className="create-user-form">

                <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Ingrese el nombre"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Correo</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Ingrese correo"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Ingrese la contraseña"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="role">Rol</label>
                    <select id="role" name="role">
                        <option value="">Seleccione un rol</option>
                        <option value="admin">Administrador</option>
                        <option value="user">Usuario</option>
                    </select>
                </div>

                <button type="submit">Guardar Usuario</button>

            </form>
        
        </div>
    );
}

export default CreateUser;