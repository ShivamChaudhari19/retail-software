import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { fetchDashboardData } from "../../service/Dashboard";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DashboardCharts from "../../componenets/DashboardCharts/DashboardCharts";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // LOAD DASHBOARD DATA
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchDashboardData();
        setData(response.data);
        console.log("Dashboard data:", response.data);
      } catch (error) {
        console.error(error);
        toast.error("Unable to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // LOADING STATE
  if (loading) {
    return (
      <div className="dashboard-wrapper">
        <div className="dashboard-container">
          <Skeleton height={120} count={2} style={{ marginBottom: "20px" }} />
          <Skeleton height={300} />
        </div>
      </div>
    );
  }

  // SAFETY CHECK
  if (!data) {
    return <div className="error">Failed to load dashboard data.</div>;
  }

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">

        {/* STATS */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="bi bi-currency-rupee"></i>
            </div>
            <div className="stat-content">
              <h3>Today's Sale</h3>
              <p>₹{(data.todaySale || 0).toFixed(2)}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="bi bi-cart-check"></i>
            </div>
            <div className="stat-content">
              <h3>Today's Orders</h3>
              <p>{data.todayOrderCount || 0}</p>
            </div>
          </div>
        </div>

        {/* CHARTS */}
        <DashboardCharts data={data} />

        {/* RECENT ORDERS */}
        <div className="recent-orders-card">
          <h3 className="recent-orders-title">
            <i className="bi bi-clock-history"></i> Recent Orders
          </h3>

          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>

              <tbody>
                {data.resentOrders?.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No orders found
                    </td>
                  </tr>
                )}

                {data.resentOrders?.map((order) => (
                  <tr key={order.orderId}>
                    <td>{order.orderId.substring(0, 8)}...</td>
                    <td>{order.customerName}</td>
                    <td>₹{order.grandTotal.toFixed(2)}</td>

                    <td>
                      <span
                        className={`payment-method ${order.paymentMethod.toLowerCase()}`}
                      >
                        {order.paymentMethod}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`status-badge ${order.paymentDetails.status.toLowerCase()}`}
                      >
                        {order.paymentDetails.status}
                      </span>
                    </td>

                    <td>
                      {new Date(order.createdAt).toLocaleString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "short",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
