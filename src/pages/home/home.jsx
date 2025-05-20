import { useEffect, useState } from 'react';
import { getAll } from '../utils/dbUtil';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Example: Fetch all users to test dbUtil
        getAll('users')
            .then(data => setUsers(data))
            .catch(err => setError(err.message));
    }, []);

    return (
        <div>
            <h1>Welcome to the Home Page!</h1>
            <p>This is the starting point of your application.</p>
            <h2>Users from dbUtil:</h2>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Home;