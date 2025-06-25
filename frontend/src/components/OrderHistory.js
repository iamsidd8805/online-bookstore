import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setOrders(response.data);
      } catch (err) {
        // Optionally show error UI
      }
    };

    if (user) {
      fetchOrderHistory();
    }
  }, [user]);

  return (
    <div className="order-history-pro">
      <div className="order-history-header">
        <h1>
          <span role="img" aria-label="orders">📦</span> My Orders
        </h1>
        <p className="order-history-subtitle">
          Track your recent purchases and download your invoices.
        </p>
      </div>
      {orders.length === 0 ? (
        <div className="order-history-empty">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="No orders"
            className="order-history-empty-img"
          />
          <p>No orders found. Start shopping to see your orders here!</p>
        </div>
      ) : (
        <div className="order-history-list">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <div className="order-card-header">
                <div>
                  <span className="order-id">Order #{order._id.slice(-6).toUpperCase()}</span>
                  <span className="order-date">
                    {new Date(order.createdAt).toLocaleDateString()} &bull; {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <span className={`order-status ${order.status ? order.status.toLowerCase() : 'pending'}`}>
                  {order.status ? order.status : 'Pending'}
                </span>
              </div>
              <div className="order-card-body">
                <ul className="order-items-list">
                  {order.items
                    .filter((item) => item.bookId)
                    .map((item) => (
                      <li key={item.bookId._id} className="order-item-row">
                        <div className="order-item-info">
                          <span className="order-item-title">{item.bookId.title}</span>
                          <span className="order-item-qty">x{item.quantity}</span>
                        </div>
                        <span className="order-item-price">₹{(item.bookId.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="order-card-footer">
                <span className="order-total-label">Total:</span>
                <span className="order-total-amount">₹{order.total.toFixed(2)}</span>
                {/* <button className="order-invoice-btn">Download Invoice</button> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;