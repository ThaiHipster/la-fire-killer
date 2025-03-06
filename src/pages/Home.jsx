import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-css';
import './Home.css';
import NewsCard from '../components/NewsCard';

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch news articles from your API or a news API
    const fetchArticles = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get('/api/news');
        setArticles(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news articles:', error);
        setLoading(false);
      }
    };
    
    fetchArticles();
  }, []);
  
  // Define breakpoints for responsive layout
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };
  
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Latest News</h1>
      </header>
      
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="news-board"
          columnClassName="news-board-column"
        >
          {articles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </Masonry>
      )}
    </div>
  );
}

export default Home; 