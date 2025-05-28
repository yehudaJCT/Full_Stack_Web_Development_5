export const filterTodos = (todos, searchTerm) => {
    if (!searchTerm || typeof searchTerm !== 'string' || !searchTerm.trim()) {
        return todos;
    }

    const term = searchTerm.toLowerCase().trim();
    return todos.filter(todo =>
        todo.id.toString().includes(term) ||
        todo.title.toLowerCase().includes(term) ||
        (term === 'completed' && todo.completed) ||
        (term === 'pending' && !todo.completed) ||
        (term === 'done' && todo.completed) ||
        (term === 'incomplete' && !todo.completed) ||
        (term === 'finished' && todo.completed) ||
        (term === 'unfinished' && !todo.completed)
    );
};

export const filterPosts = (posts, searchTerm) => {
    if (!searchTerm || typeof searchTerm !== 'string' || !searchTerm.trim()) {
        return posts;
    }

    const term = searchTerm.toLowerCase().trim();
    return posts.filter(post =>
        post.id.toString().includes(term) ||
        post.title.toLowerCase().includes(term)
    );
};

export const filterAlbums = (albums, searchTerm) => {
    if (!searchTerm || typeof searchTerm !== 'string' || !searchTerm.trim()) {
        return albums;
    }

    const term = searchTerm.toLowerCase().trim();
    return albums.filter(album =>
        album.id.toString().includes(term) ||
        album.title.toLowerCase().includes(term)
    );
};