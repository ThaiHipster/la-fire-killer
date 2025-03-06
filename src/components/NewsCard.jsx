import React from 'react';
import './NewsCard.css';

function NewsCard({ article }) {
  return (
    <div className="news-card">
      <div className="news-card-image">
        {article.imageUrl && (
          <img src={article.imageUrl} alt={article.title} />
        )}
      </div>
      <div className="news-card-content">
        <h3 className="news-card-title">{article.title}</h3>
        <p className="news-card-excerpt">{article.excerpt}</p>
        <div className="news-card-meta">
          <span className="news-card-source">{article.source}</span>
          <span className="news-card-date">{new Date(article.publishedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}

export default NewsCard; 