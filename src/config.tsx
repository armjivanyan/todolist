import { IButtonConfig, ITaskStatuConfig } from "./interfaces";

export const buttonConfig = {
    add_user: {
        placeholder: 'Name',
        buttonId: 'btn-add-user',
        buttonText: 'Add User',
    },
    add_task: {
        placeholder: 'Task Description',
        buttonId: 'btn-add-task',
        buttonText: 'Add Task',
    }
} as IButtonConfig;

export const taskStatusConfig = {
    to_do: {
        title: 'To Do',
        color: 'secondary'
    },
    in_progress: {
        title: 'In Progress',
        color: 'primary'
    },
    done: {
        title: 'Done',
        color: 'success'
    }
} as ITaskStatuConfig;