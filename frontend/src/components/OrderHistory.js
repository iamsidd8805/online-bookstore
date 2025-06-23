import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './OrderHistory.css'; // Optional: Add styles for this component

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        console.log('Fetching order history for user:', user);
        const response = await axios.get('http://localhost:5000/api/orders', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        console.log('Order history response:', response.data);
        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching order history:', err);
      }
    };

    if (user) {
      fetchOrderHistory();
    }
  }, [user]);

  return (
    <div className="order-history">
      <h1>Order History</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id} className="order-item">
              <h2>Order ID: {order._id}</h2>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Total: ₹{order.total.toFixed(2)}</p>
              <ul>
                {order.items
                .filter((item) => item.bookId)
                .map((item) => (
                  <li key={item.bookId._id}>
                    {item.bookId.title} - {item.quantity} x ₹{item.bookId.price}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;