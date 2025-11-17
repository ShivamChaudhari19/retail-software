import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";

const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FF0000"];

export default function DashboardCharts({ data }) {
  if (!data) return null;

  const orders = data.resentOrders || [];

  // ---------------------------------------------------
  // 1) ORDERS TODAY VS YESTERDAY
  // ---------------------------------------------------
  const today = new Date().toISOString().slice(0, 10);
  const yesterdayDate = new Date(Date.now() - 86400000)
    .toISOString()
    .slice(0, 10);

  const todayCount = orders.filter(o => o.createdAt.slice(0, 10) === today).length;
  const yesterdayCount = orders.filter(o => o.createdAt.slice(0, 10) === yesterdayDate).length;

  const barData = [
    { name: "Today", value: todayCount },
    { name: "Yesterday", value: yesterdayCount }
  ];

  // ---------------------------------------------------
  // 2) PAYMENT METHOD SPLIT
  // ---------------------------------------------------
  const paymentStats = {
    CASH: 0,
    UPI: 0
  };

  orders.forEach(o => {
    const pm = o.paymentMethod?.toUpperCase();
    if (paymentStats[pm] !== undefined) {
      paymentStats[pm] += 1;
    }
  });

  const pieData = [
    { name: "Cash", value: paymentStats.CASH },
    { name: "UPI", value: paymentStats.UPI }
  ];

  // ---------------------------------------------------
  // 3) ORDER STATUS DISTRIBUTION
  // ---------------------------------------------------
  const orderStatus = {
    COMPLETED: 0,
    PENDING: 0,
    FAILED: 0
  };

  orders.forEach(o => {
    const st = o.paymentDetails?.status?.toUpperCase();
    if (orderStatus[st] !== undefined) {
      orderStatus[st] += 1;
    }
  });

  const orderStatusData = [
    { name: "Completed", value: orderStatus.COMPLETED },
    { name: "Pending", value: orderStatus.PENDING },
    { name: "Failed", value: orderStatus.FAILED }
  ];

  // ---------------------------------------------------
  // 4) SALES TREND (LAST 7 DAYS)
  // ---------------------------------------------------
  function formatDate(d) {
    return d.toISOString().slice(0, 10);
  }

  const last7days = [];
  for (let i = 6; i >= 0; i++) {
    const d = new Date(Date.now() - i * 86400000);
    const key = formatDate(d);

    const totalSales = orders
      .filter(o => o.createdAt.slice(0, 10) === key)
      .reduce((sum, o) => sum + (o.grandTotal || 0), 0);

    last7days.push({
      day: d.toLocaleDateString("en-US", { weekday: "short" }),
      totalSales
    });
  }

  return (
    <div
      style={{
        marginTop: 30,
        display: "grid",
        gap: 20,
        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))"
      }}
    >
      {/* BAR CHART */}
      <div className="chart-card">
        <h4>Orders Comparison</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#0088FE" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* PAYMENT METHOD PIE */}
      <div className="chart-card">
        <h4>Payment Method Split</h4>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Tooltip />
            <Legend />
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label={(entry) => `${entry.name}: ${entry.value}`}
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ORDER STATUS PIE */}
      <div className="chart-card">
        <h4>Order Status Distribution</h4>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Tooltip />
            <Legend />
            <Pie
              data={orderStatusData}
              cx="50%"
              cy="50%"
              outerRadius={110}
              dataKey="value"
              label={(entry) => `${entry.name}: ${entry.value}`}
            >
              {orderStatusData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* SALES TREND */}
      <div className="chart-card">
        <h4>Sales Trend (Last 7 Days)</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={last7days}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="totalSales" stroke="#00C49F" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
