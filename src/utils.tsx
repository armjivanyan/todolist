import db from './firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, getDocs, getDoc, query, where } from 'firebase/firestore';
import { ITask, IUser } from './interfaces';

export const addUser = async (name: string) => {
    const usersRef = collection(db, "users");
    const user = { name, completionRate: 0, totalTasks: 0, doneTasks: 0 };
    await addDoc(usersRef, user);
}

export const deleteUser = async (userId: string) => {
    const userRef = doc(db, 'users', userId);
    await deleteDoc(userRef);

    const userTasksSnapshot = await getDocs(query(collection(db, "tasks"), where("userId", "==", userId)));
    userTasksSnapshot.forEach(async (task) => {
        const taskRef = doc(db, 'tasks', task.id);
        await deleteDoc(taskRef);
    });
}

export const addTask = async (description: string, userId: string) => {
    const collectionRef = collection(db, "tasks");
    const task = { description, status: 'to_do', userId };
    await addDoc(collectionRef, task);

    await updateUserTasks(userId, 'add', task.status);
}

export const changeTaskStatus = async (taskId: string, status: string) => {
    const taskRef = doc(db, 'tasks', taskId);
    const { userId, status: prevStatus } = (await getDoc(taskRef)).data() as ITask;
    const payload = { status };
    await updateDoc(taskRef, payload);

    await updateUserTasks(userId, 'update', status, prevStatus);
}

export const deleteTask = async (taskId: string) => {
    const taskRef = doc(db, 'tasks', taskId);
    const { userId, status } = (await getDoc(taskRef)).data() as ITask;
    await deleteDoc(taskRef);

    await updateUserTasks(userId, 'delete', '', status);
}

const updateUserTasks = async (userId: string, action: string, taskStatus: string, taskPrevStatus: string = '') => {
    const userRef = doc(db, 'users', userId);
    const {totalTasks, doneTasks, completionRate} = (await getDoc(userRef)).data() as IUser;
    const totalIncrement = action === 'add' ? +1 : action === 'update' ? 0 : -1;
    const doneIncrement = taskStatus === 'done' ? +1 : taskPrevStatus === 'done' ? -1 : 0;
    const payload = {
        totalTasks: totalTasks + totalIncrement,
        doneTasks: doneTasks + doneIncrement,
        completionRate
    };
    payload.completionRate = Math.ceil(payload.doneTasks/payload.totalTasks*100) || payload.doneTasks;
    await updateDoc(userRef, payload);
}