// src/components/BasicFetchingDemo/BasicFetchingDemo.jsx
import React, { useState, useEffect } from "react";

const BasicFetchingDemo = () => {
  // State untuk data posts, loading, dan error
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect untuk fetching data menggunakan fetch API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Memulai fetching data...");

        // Simulasi delay network
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Fetch data dari API
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=5"
        );

        // Check jika response tidak OK
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data berhasil diambil:", data);
        setPosts(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Function untuk refetch data
  const refetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Memulai refetch data...");

      // Fetch data dari API
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=5"
      );

      // Check jika response tidak OK
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Data berhasil diambil:", data);
      setPosts(data);
    } catch (err) {
      console.error("Error refetching data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function untuk simulasi error dengan URL yang salah
  const fetchWithError = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Simulasi error dengan URL yang salah...");

      // Fetch data dari URL yang salah
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/invalid-url"
      );

      // Check jika response tidak OK
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Data berhasil diambil:", data);
      setPosts(data);
    } catch (err) {
      console.error("Simulasi Error:", err);
      setError(`Simulasi Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="basic-fetching-demo">
      <h2>Basic Data Fetching Demo</h2>
      <p>Mengambil data posts dari JSONPlaceholder API</p>

      {/* Control Buttons */}
      <div className="control-buttons">
        <button
          onClick={refetchData}
          disabled={loading}
          className="btn btn-primary"
        >
          {loading ? "Memuat..." : "Refresh Data"}
        </button>
        <button
          onClick={fetchWithError}
          disabled={loading}
          className="btn btn-warning"
        >
          Simulasi Error
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Sedang memuat data posts...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="error-state">
          <h3>Terjadi Kesalahan!</h3>
          <p>{error}</p>
          <button onClick={refetchData} className="btn btn-secondary">
            Coba Lagi
          </button>
        </div>
      )}

      {/* Success State */}
      {!loading && !error && (
        <div className="success-state">
          <h3>Daftar Posts ({posts.length})</h3>
          {posts.length === 0 ? (
            <div className="empty-state">
              <p>Tidak ada data posts</p>
            </div>
          ) : (
            <div className="posts-grid">
              {posts.map((post) => (
                <div key={post.id} className="post-card">
                  <h4>{post.title}</h4>
                  <p>{post.body}</p>
                  <div className="post-meta">
                    <span>User ID: {post.userId}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Debug Info */}
      <div className="debug-info">
        <h4>Status Info:</h4>
        <ul>
          <li>Loading: {loading ? "Ya" : "Tidak"}</li>
          <li>Error: {error ? error : "Tidak ada"}</li>
          <li>Jumlah Posts: {posts.length}</li>
        </ul>
      </div>
    </div>
  );
};

export default BasicFetchingDemo;
