import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => (
  <div className="col-3 col-md-2 bg-light border-end d-flex flex-column p-3" style={{ minWidth: 220 }}>
    <div className="d-flex flex-column align-items-center mb-4">
      <div className="rounded-circle bg-secondary" style={{ width: 60, height: 60 }}></div>
      <span className="mt-2 fw-bold">user name</span>
      <span className="text-muted" style={{ fontSize: 12 }}>__________</span>
    </div>
    <div className="mb-3">
      <button
        className={`btn w-100 text-start mb-2 ${activeTab === 'posts' ? 'btn-outline-dark' : 'btn-link text-dark text-decoration-none'}`}
        onClick={() => setActiveTab('posts')}
      >
        posts
      </button>
      <button
        className={`btn w-100 text-start mb-2 ${activeTab === 'albums' ? 'btn-outline-dark' : 'btn-link text-dark text-decoration-none'}`}
        onClick={() => setActiveTab('albums')}
      >
        albums
      </button>
      <button
        className={`btn w-100 text-start ${activeTab === 'todos' ? 'btn-outline-dark' : 'btn-link text-dark text-decoration-none'}`}
        onClick={() => setActiveTab('todos')}
      >
        todos
      </button>
    </div>
  </div>
);

export default Sidebar;