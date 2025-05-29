// Sorting utility functions
export const sortTodos = (todos, sortBy) => {
    if (!sortBy || !Array.isArray(todos)) return todos;
    
    const sortedTodos = [...todos];
    
    switch (sortBy) {
        case "id":
            return sortedTodos.sort((a, b) => a.id - b.id);
        case "title":
            return sortedTodos.sort((a, b) => 
                a.title.toLowerCase().localeCompare(b.title.toLowerCase())
            );
        case "completion":
            // Sort by completion status: completed first, then pending
            return sortedTodos.sort((a, b) => {
                if (a.completed === b.completed) {
                    return a.id - b.id; // Secondary sort by ID
                }
                return b.completed - a.completed; // Completed (true) first
            });
        default:
            return sortedTodos;
    }
};

export const sortPosts = (posts, sortBy) => {
    if (!sortBy || !Array.isArray(posts)) return posts;
    
    const sortedPosts = [...posts];
    
    switch (sortBy) {
        case "id":
            return sortedPosts.sort((a, b) => a.id - b.id);
        case "title":
            return sortedPosts.sort((a, b) => 
                a.title.toLowerCase().localeCompare(b.title.toLowerCase())
            );
        default:
            return sortedPosts;
    }
};

export const sortAlbums = (albums, sortBy) => {
    if (!sortBy || !Array.isArray(albums)) return albums;
    
    const sortedAlbums = [...albums];
    
    switch (sortBy) {
        case "id":
            return sortedAlbums.sort((a, b) => a.id - b.id);
        case "title":
            return sortedAlbums.sort((a, b) => 
                a.title.toLowerCase().localeCompare(b.title.toLowerCase())
            );
        default:
            return sortedAlbums;
    }
};