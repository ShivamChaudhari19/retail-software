import React from "react";
import {
  BarChart, Bar,
  PieChart, Pie,
  LineChart, Line,
  XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer,
  Cell
} from "recharts";

const COLORS = ["#4CAF50", "#2196F3", "#FFC107", "#FF5722", "#9C27B0"];

const DashboardCharts = ({ data }) => {
  const orders = data?.recentOrders || [];
  const comparison = data?.orderComparison || { today: 0, yesterday: 0 };
  const paymentSplit = data?.paymentMethodSplit || {};
  const orderStatusSplit = data?.orderStatusDistribution || {};
  const salesTrend = data?.weeklySales || [];

  const paymentSplitChart = Object.entries(paymentSplit).map(([method, value]) => ({
    name: method.toUpperCase(),
    value,
  }));

  const orderStatusChart = Object.entries(orderStatusSplit).map(([status, value]) => ({
    name: status.toUpperCase(),
    value,
  }));

  const comparisonData = [
    { name: "Today", value: comparison.today },
    { name: "Yesterday", value: comparison.yesterday },
  ];

  const COLORS_DYNAMIC = COLORS.slice(0, paymentSplitChart.length);

  return (
    <div className="dashboard-charts">

      {/* Orders Comparison */}
      <div className="chart-card">
        <h3>Orders Comparison</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={comparisonData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value">
              {comparisonData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Payment Split */}
      <div className="chart-card">
        <h3>Payment Method Split</h3>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              dataKey="value"
              data={paymentSplitChart}
              label={(entry) => entry.name}
            >
              {paymentSplitChart.map((_, i) => (
                <Cell key={i} fill={COLORS_DYNAMIC[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Order Status Distribution */}
      <div className="chart-card">
        <h3>Order Status Distribution</h3>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              dataKey="value"
              data={orderStatusChart}
              label={(entry) => entry.name}
            >
              {orderStatusChart.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Sales Trend */}
      <div className="chart-card wide">
        <h3>Sales Trend (Last 7 Days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesTrend}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="totalSales" stroke="#2196F3" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default DashboardCharts;
