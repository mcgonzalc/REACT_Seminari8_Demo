import React, { useState } from "react";
import { User } from '../../types';
import styles from './UserEdit.module.css'; // Import the CSS module
import { updateUser } from "../../services/usersService";

interface UserEditProps {
    user: User;
    onClose: () => void;
    onSave: (updatedUser: User) => void;
}

const UserEdit: React.FC<UserEditProps> = ({ user, onClose, onSave }) => {
    const [name, setName] = useState(user.name);
    const [age, setAge] = useState(user.age);
    const [email, setEmail] = useState(user.email);

    const handleSave = async () => {
        try {
            const updatedUser = { ...user, name, age, email };
            console.log("Saving user:", updatedUser); // Agregar log para depuración
            await updateUser(user._id, updatedUser); // Realiza la solicitud PUT al servidor
            onSave(updatedUser); // Actualiza el estado en el cliente
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2>Edit User</h2>
            <form className={styles.form}>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="name">Name:</label>
                    <input
                        id="name"
                        type="text"
                        className={styles.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="age">Age:</label>
                    <input
                        id="age"
                        type="number"
                        className={styles.input}
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        className={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={styles.buttonGroup}>
                    <button type="button" className={styles.button} onClick={handleSave}>Save</button>
                    <button type="button" className={styles.button} onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default UserEdit;