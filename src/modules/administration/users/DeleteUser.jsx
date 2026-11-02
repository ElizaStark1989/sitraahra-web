import "./DeleteUser.css";
import { useParams, useNavigate } from "react-router-dom";

function DeleteUser() {

    const { id } = useParams();

    const navigate = useNavigate();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const selectedUser = users.find((user) => user.id === id);

    const handleDelete = () => {

        const updatedUsers = users.filter((user) => user.id !== id);

        localStorage.setItem("users", JSON.stringify(updatedUsers));

        navigate("/administration/users/list");

    };


    return (
        <div className="delete-user">

            <div className="delete-user-card">
                <h1>Eliminar usuario</h1>

                <p>
                    ¿Está seguro de que desea eliminar al usuario
                    <strong> {selectedUser?.name} </strong>?
                </p>

                <p className="delete-warning">
                    Esta acción no se puede deshacer.
                </p>

                <div className="delete-actions">

                    <button
                        type="button"
                        onClick={() => navigate("/administration/users/list")}
                    >
                        Cancelar</button>


                    <button type="button" onClick={handleDelete}>Eliminar</button>
                </div>
            </div>

        </div>
    )
};

export default DeleteUser;