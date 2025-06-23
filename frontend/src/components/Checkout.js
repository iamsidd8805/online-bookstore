import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Checkout.css';

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const navigate = useNavigate();

  // Use salePrice if available, else use price
  const subtotal = cart.reduce(
    (total, item) =>
      total +
      (item.bookId.salePrice && item.bookId.salePrice < item.bookId.price
        ? item.bookId.salePrice
        : item.bookId.price) * item.quantity,
    0
  );

  const tax = subtotal * 0.12; // 12% tax
  const discount = subtotal > 1000 ? subtotal * 0.05 : 0; // 5% discount if subtotal > 1000
  const total = subtotal + tax - discount;

  const handleBuyNow = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.token) {
        throw new Error('User not logged in or token missing');
      }

      const response = await axios.post(
        'http://localhost:5000/api/cart/checkout',
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      console.log('Checkout response:', response.data);

      setOrderDetails({
        cart: cart.map((item) => ({
          ...item,
          quantity: item.quantity,
        })),
        subtotal,
        tax,
        discount,
        total,
      });

      setOrderConfirmed(true);
      clearCart();
    } catch (err) {
      console.error('Checkout error:', err.response?.data || err.message);
    }
  };

  return (
    <div className="checkout">
      {!orderConfirmed && (
        <>
          <h1>Checkout</h1>
          <img
            src="https://cdn-icons-png.flaticon.com/512/11181/11181359.png"
            alt="Checkout Logo"
            className="checkout-logo"
          />
        </>
      )}

      {orderConfirmed ? (
        <div className="order-confirmed">
          <h2>Your order has been confirmed!</h2>
          <h3>Order Details:</h3>
          <ul>
            {orderDetails.cart.map((item) => {
              const priceToShow =
                item.bookId.salePrice && item.bookId.salePrice < item.bookId.price
                  ? item.bookId.salePrice
                  : item.bookId.price;
              return (
                <li key={item.bookId._id}>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <img
                            src={item.bookId.coverImage}
                            alt={item.bookId.title}
                            className="cart-item-image"
                          />
                        </td>
                        <td>
                          {item.bookId.title} - {item.quantity} x ₹{priceToShow} = ₹
                          {item.quantity * priceToShow}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </li>
              );
            })}
          </ul>
          <p>Subtotal: ₹{orderDetails.subtotal.toFixed(2)}</p>
          <p>Tax (12%): ₹{orderDetails.tax.toFixed(2)}</p>
          <p>Discount (5%): ₹{orderDetails.discount.toFixed(2)}</p>
          <p>Total: ₹{orderDetails.total.toFixed(2)}</p>

          <button onClick={() => navigate('/shop')} className="continue-shopping-button">
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => {
              const priceToShow =
                item.bookId.salePrice && item.bookId.salePrice < item.bookId.price
                  ? item.bookId.salePrice
                  : item.bookId.price;
              return (
                <div key={item.bookId._id} className="cart-item">
                  <img src={item.bookId.coverImage} alt={item.bookId.title} />
                  <div className="book-details">
                    <h2>{item.bookId.title}</h2>
                    <p>Author: {item.bookId.author}</p>
                    <p>
                      Price:{' '}
                      {item.bookId.salePrice && item.bookId.salePrice < item.bookId.price ? (
                        <>
                          <span style={{ textDecoration: 'line-through', color: 'red' }}>
                            ₹{item.bookId.price}
                          </span>{' '}
                          <span style={{ fontWeight: 'bold', color: 'green' }}>
                            ₹{item.bookId.salePrice}
                          </span>
                        </>
                      ) : (
                        <>₹{item.bookId.price}</>
                      )}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Total: ₹{item.quantity * priceToShow}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="price-summary">
            <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
            <p>Tax (12%): ₹{tax.toFixed(2)}</p>
            <p>Discount (5%): ₹{discount.toFixed(2)}</p>
            <p>Total: ₹{total.toFixed(2)}</p>
          </div>
          <div className="checkout-buttons">
            <button onClick={() => navigate('/cart')} className="back-button-checkout">
              Back
            </button>
            <button onClick={handleBuyNow} className="buy-now-button">
              Buy Now
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;