import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Components/sidebar';
import SearchBar from './Components/searchBar';
import FloatingActionButton from './Components/floatingActionButton';
import Posts from './posts/posts';
import Albums from './albums/albums';
import Todos from './todos/todos';
import { UserProvider } from '../../hooks/userProvider'; // <-- import UserProvider

const Home = () => {
  const [activeTab, setActiveTab] = useState('posts');

  return (
    <UserProvider>
      <div className="container-fluid vh-100">
        <div className="d-flex h-100">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex-grow-1 p-4 position-relative">
            <div className="d-flex justify-content-center">
              <SearchBar />
            </div>
            {activeTab === 'posts' && <Posts />}
            {activeTab === 'albums' && <Albums />}
            {activeTab === 'todos' && <Todos />}
            <FloatingActionButton />
          </div>
        </div>
      </div>
    </UserProvider>
  );
};

export default Home;