import React, { useState } from "react";
import { User } from '../../types';
import styles from './UsersList.module.css';
import UserEdit from '../UserEdit/UserEdit'; // Import the new UserEdit component
interface Props {
    users: User[];
    onUpdateUser: (updatedUser: User) => void; // Callback to handle user updates
}

const UsersList: React.FC<Props> = ({ users, onUpdateUser }) => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleUserClick = (user: User) => {
        setSelectedUser(user); // Set the selected user for editing
    };

    const handleCloseEdit = () => {
        setSelectedUser(null); // Close the edit component
    };

    const renderList = (): React.ReactNode[] => {
        return users.map((user) => (
            <li
                key={user._id} // Cambiado de user.name a user.id para garantizar unicidad
                className={styles.listItem}
                onClick={() => handleUserClick(user)}
                style={{ cursor: "pointer" }}
            >
                <div className={styles.userInfo}>
                    <h2 className={styles.user}>{user.name}</h2>
                    <h3 className={styles.age}>Age: {user.age}</h3>
                    <p className={styles.email}>{user.email}</p>
                </div>
            </li>
        ));
    };

    return (
        <div>
            <ul className={styles.list}>{renderList()}</ul>
            {selectedUser && (
                <UserEdit
                    user={selectedUser}
                    onClose={handleCloseEdit}
                    onSave={(updatedUser) => {
                        onUpdateUser(updatedUser);
                        handleCloseEdit();
                    }}
                />
            )}
        </div>
    );
};

export default UsersList;