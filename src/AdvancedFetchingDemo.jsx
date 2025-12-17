// src/components/AdvancedFetchingDemo/AdvancedFetchingDemo.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const AdvancedFetchingDemo = () => {
  // State untuk data users, selected user ID, posts, loading, error, dan search term
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState({ users: true, posts: false });
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Effect untuk fetching semua users menggunakan Axios
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading((prev) => ({ ...prev, users: true }));
        setError(null);

        console.log("Fetching users...");
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );

        console.log("Users berhasil diambil:", response.data);
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(`Gagal memuat data users: ${err.message}`);
      } finally {
        setLoading((prev) => ({ ...prev, users: false }));
      }
    };

    fetchUsers();
  }, []);

  // Effect untuk fetching posts berdasarkan user ID (dependent fetching)
  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!selectedUserId) return;

      try {
        setLoading((prev) => ({ ...prev, posts: true }));
        setError(null);

        console.log(`Fetching posts untuk user ID: ${selectedUserId}`);
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?userId=${selectedUserId}`
        );

        console.log("Posts berhasil diambil:", response.data);
        setUserPosts(response.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError(`Gagal memuat data posts: ${err.message}`);
      } finally {
        setLoading((prev) => ({ ...prev, posts: false }));
      }
    };

    fetchUserPosts();
  }, [selectedUserId]);

  // Function untuk filter users berdasarkan search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function untuk reset selection
  const resetSelection = () => {
    setSelectedUserId("");
    setUserPosts([]);
    setSearchTerm("");
  };

  return (
    <div className="advanced-fetching-demo">
      <h2>Advanced Data Fetching dengan Axios</h2>
      <p>Dependent fetching, search, dan optimisasi dengan Axios</p>

      {/* Search Box */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Cari user berdasarkan nama atau email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={resetSelection} className="btn btn-secondary">
          Reset
        </button>
      </div>

      {/* Users List */}
      <div className="users-section">
        <h3>Daftar Users</h3>

        {/* Loading State */}
        {loading.users && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Memuat daftar users...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-state">
            <p>{error}</p>
          </div>
        )}

        {/* Users Grid */}
        {!loading.users && !error && (
          <div className="users-grid">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`user-card ${
                  selectedUserId === user.id ? "active" : ""
                }`}
                onClick={() => setSelectedUserId(user.id.toString())}
              >
                <h4>{user.name}</h4>
                <p>{user.email}</p>
                <p>{user.company.name}</p>
                <p>{user.website}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User Posts */}
      {selectedUserId && (
        <div className="posts-section">
          <h3>
            Posts dari User{" "}
            {users.find((u) => u.id.toString() === selectedUserId)?.name}
            {loading.posts && <span className="loading-badge">Loading...</span>}
          </h3>

          {/* Loading State */}
          {loading.posts && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Memuat posts...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="error-state">
              <p>{error}</p>
            </div>
          )}

          {/* Posts List */}
          {!loading.posts && !error && (
            <div className="posts-list">
              {userPosts.length === 0 ? (
                <div className="empty-state">
                  <p>User ini belum membuat posts</p>
                </div>
              ) : (
                <div className="post-items">
                  {userPosts.map((post) => (
                    <div key={post.id} className="post-item">
                      <h4>{post.title}</h4>
                      <p>{post.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Statistics */}
      <div className="stats-section">
        <h4>Statistics:</h4>
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-number">{users.length}</span>
            <span className="stat-label">Total Users</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{filteredUsers.length}</span>
            <span className="stat-label">Filtered Users</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{userPosts.length}</span>
            <span className="stat-label">User Posts</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {selectedUserId ? "Ya" : "Tidak"}
            </span>
            <span className="stat-label">User Selected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFetchingDemo;
