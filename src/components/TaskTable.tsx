

import { taskStatusConfig } from '../config';
import { addTask, changeTaskStatus, deleteTask } from '../utils';

import { Table, Dropdown, ButtonGroup } from "react-bootstrap";

import AddInputGroup from './AddInputGroup';
import DeleteButton from './DeleteButton';
import { ITask, ITaskTable } from '../interfaces';

const TaskTable = ({ tasks, currentUser }: ITaskTable) => {
    const taskStatusKeys = Object.keys(taskStatusConfig);
    let userTasks = tasks?.filter((task: ITask) => task.userId === currentUser.id);
    userTasks?.sort((a: ITask, b: ITask) => a.status > b.status ? -1 : a.status < b.status ? 1 : 0)
    return (
        <div className="animate__animated animate__fadeInRight">
            <AddInputGroup type='add_task' submitHandler={addTask} currentUserId={currentUser.id} />
            <Table bordered hover variant='dark'>
                <thead>
                    <tr>
                        <th className='w-75'>Description</th>
                        <th className='w-25'>Status</th>
                    </tr>
                </thead>
                <tbody className="animate__animated animate__fadeInRight">
                    {
                        userTasks?.map((task: ITask, i: number) => {
                            let { title, color } = taskStatusConfig[task.status];
                            return (
                                <tr key={i} >
                                    <td>
                                        <DeleteButton deleteHandler={deleteTask} itemId={task.id} />
                                        {task.description}
                                    </td>
                                    <td className='center'>
                                        <Dropdown as={ButtonGroup}>
                                            <Dropdown.Toggle variant={color}>
                                                {title}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {taskStatusKeys.map((statusKey: string, j: number) => {
                                                    let { title } = taskStatusConfig[statusKey];
                                                    return (
                                                        <Dropdown.Item key={j} onClick={() => changeTaskStatus(task.id, statusKey)}>{title}</Dropdown.Item>
                                                    )
                                                })}
                                            </Dropdown.Menu>
                                        </Dropdown>
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

export default TaskTable;