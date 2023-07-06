import { Table } from "react-bootstrap";

import { addUser, deleteUser } from "../utils";

import AddInputGroup from "./AddInputGroup";
import DeleteButton from "./DeleteButton";

import { IUser, IUserTable } from "../interfaces";

const UserTable = ({ users, setCurrentUser }: IUserTable) => {
    const handleUserClick = (user: any) => {
        return setCurrentUser((prevUser: any) => {
            if (prevUser) {
                document.getElementById(prevUser.id)?.classList.remove('activeUser');
            }
            document.getElementById(user.id)?.classList.add('activeUser');
            return user;
        })
    }

    return (
        <div className="animate__animated animate__fadeInLeft">
            <AddInputGroup type='add_user' submitHandler={addUser} />
            <Table bordered hover variant='dark'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Completion Rate(%)</th>
                    </tr>
                </thead>
                <tbody className="animate__animated animate__fadeInLeft">
                    {
                        users.map((user: IUser, i: number) => {
                            return (
                                <tr key={user.id} id={user.id} onClick={() => handleUserClick(user)}>
                                    <td>
                                        <DeleteButton deleteHandler={deleteUser} itemId={user.id} />
                                        {user.name}
                                    </td>
                                    <td className="center">
                                        {user.completionRate}
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default UserTable;