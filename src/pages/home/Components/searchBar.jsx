import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm, activeTab }) => {
  const getPlaceholder = () => {
    switch (activeTab) {
      case "todos":
        return "Search todos by ID, title, or completion status...";
      case "posts":
        return "Search posts by ID or title...";
      case "albums":
        return "Search albums by ID or title, or photos by title...";
      default:
        return "Search...";
    }
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <div
      className="d-flex align-items-center mb-4 w-100"
      style={{ maxWidth: 700 }}
    >
      <span className="me-2" style={{ fontSize: 24 }}>
        &#128269;
      </span>
      <div className="position-relative flex-grow-1 me-2">
        <input
          type="text"
          className="form-control"
          placeholder={getPlaceholder()}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            paddingRight: searchTerm ? "40px" : "12px",
            borderRadius: "8px",
            border: "2px solid #e9ecef",
            transition: "border-color 0.2s ease",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#667eea";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e9ecef";
          }}
        />
        {searchTerm && (
          <button
            type="button"
            className="btn btn-link position-absolute"
            style={{
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              padding: "4px",
              fontSize: "16px",
              color: "#6c757d",
              textDecoration: "none",
            }}
            onClick={handleClear}
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;