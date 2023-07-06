import { useEffect, useState } from 'react';

import db from './firebase';
import { collection, onSnapshot } from 'firebase/firestore';

import { IUser, ITask } from './interfaces';

import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import './App.scss';

import UserTable from './components/UserTable';
import TaskTable from './components/TaskTable';

function App() {
  const [users, setUsers] = useState(null as IUser[] | null);
  const [tasks, setTasks] = useState(null as ITask[] | null);
  const [currentUser, setCurrentUser] = useState(null as IUser | null);

  useEffect(() => {
    onSnapshot(collection(db, "users"), (snapshot) =>
      setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as IUser)))
    );
    onSnapshot(collection(db, "tasks"), (snapshot) =>
      setTasks(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as ITask)))
    );
    return;
  }, []);

  useEffect(() => {
    let isCurrentUserAvailable = users?.some((user: IUser) => user.id === currentUser?.id);
    if (!isCurrentUserAvailable && currentUser !== null) {
      setCurrentUser(null);
    }
    return;
  }, [users, currentUser])

  return (
    <div className="App">
      <Container>
        <Row>
          <Col xs={12} md={6}>
            {
              users ?
                <UserTable users={users} setCurrentUser={setCurrentUser} />
                :
                <Spinner animation='border' variant='light' />
            }
          </Col>
          <Col xs={12} md={6}>
            {
              currentUser ?
                <TaskTable tasks={tasks} currentUser={currentUser} />
                :
                <Alert variant='secondary' className='animate__animated animate__fadeInRight'>
                  Tasks assigned to the user will be displayed here
                </Alert>
            }
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
