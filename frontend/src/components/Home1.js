import React from 'react';
import Header from './Header';
import './Home1.css';
import { useNavigate } from 'react-router-dom';

const Home1 = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className="home1-body">
        <h3>Welcome to</h3>
        <h1>BookVerse</h1>
        <p>A cozy corner for every reader.</p>

        <div className="promo-container">
          <div className="promo-card">
            <div className="promo-image">
              <img src="/Image/booksale.jpg" alt="Sale" />
            </div>
            <div className="promo-content">
              <div className="promo-title">Sale</div>
              <button
                className="promo-button"
                onClick={() => navigate('/shop?sale=true')}
              >
                Learn More
              </button>
            </div>
          </div>

          <div className="promo-card">
            <div className="promo-image">
              <img className="promo-img" src="/Image/newarival.jpg" alt="New Arrivals" />
            </div>
            <div className="promo-content">
              <div className="promo-title">New Arrivals</div>
              <button
                className="promo-button"
                onClick={() => navigate('/shop?sort=newest')}
              >
                Learn More
              </button>
            </div>
          </div>

          <div className="promo-card">
            <div className="promo-image">
              <img className="promo-img" src="/Image/more.jpg" alt="Best Collection" />
            </div>
            <div className="promo-content">
              <div className="promo-title">Book Collection</div>
              <button
                className="promo-button"
                onClick={() => navigate('/shop')}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        <div className="genre-container">
          <div className="genre-box" onClick={() => navigate('/shop?genre=Fiction')}>
            <img src="/Image/fiction.jpg" alt="Fiction" />
            <div className="genre-label">Fiction</div>
          </div>
          <div className="genre-box" onClick={() => navigate('/shop?genre=Sci-Fi')}>
            <img src="/Image/scifi.jpg" alt="Sci-Fi" />
            <div className="genre-label">Sci-Fi</div>
          </div>
          <div className="genre-box" onClick={() => navigate('/shop?genre=Romance')}>
            <img src="/Image/romance.jpg" alt="Romance" />
            <div className="genre-label">Romance</div>
          </div>
          <div className="genre-box" onClick={() => navigate('/shop?genre=Non-Fiction')}>
            <img src="/Image/nonfic.jpg" alt="Non-Fiction" />
            <div className="genre-label">Non-Fiction</div>
          </div>
          <div className="genre-box" onClick={() => navigate('/shop?genre=Horror')}>
            <img src="/Image/horror.jpg" alt="Horror" />
            <div className="genre-label">Horror</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home1;