import { useState, useEffect } from 'react';
import styles from './PostsList.module.css';

const PostsList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPosts(data.slice(0, 12)); // Only take first 12 for better presentation
            } catch (e) {
                console.error("Failed to fetch posts:", e);
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className={styles.loader}>
                <div className={styles.spinner}></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.error}>
                <h3>Oops! Something went wrong</h3>
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>Retry</button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>JSONPlaceholder Posts</h2>
            <div className={styles.grid}>
                {posts.map((post) => (
                    <div key={post.id} className={styles.card}>
                        <h3 className={styles.postTitle}>{post.title}</h3>
                        <p className={styles.postBody}>{post.body}</p>
                        <span className={styles.postId}># Post ID: {post.id}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostsList;
