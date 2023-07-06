export interface IButtonConfig {
    [key: string]: {
        placeholder: string,
        buttonId: string,
        buttonText: string,
    }
}

export interface ITaskStatuConfig {
    [key: string]: {
       title: string;
       color: string;
    }
}

export interface IUser {
    name: string;
    totalTasks: number;
    doneTasks: number;
    completionRate: number;
    id: string
}

export interface ITask {
    description: string;
    status: string;
    userId: string;
    id: string;
}

export interface IDeleteButtonProps {
    deleteHandler: (taskId: string) => Promise<void>;
    itemId: string;
}

export interface IAddInputGroup{
    type: string;
    submitHandler: ((description: string, userId: any) => Promise<void>);
    currentUserId?: string | null;
}

export interface ITaskTable{
    tasks: ITask[] | null;
    currentUser: IUser;
}

export interface IUserTable{
    users: IUser[];
    setCurrentUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}