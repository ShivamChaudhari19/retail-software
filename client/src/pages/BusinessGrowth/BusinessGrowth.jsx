import React, { useState } from 'react'

const BusinessGrowth = () => {
  const [formData, setFormData] = useState({
    monthlySales: "",
    productCount: "",
    customerCount: "",
    repeatCustomerRate: "",
    marketingSpend: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/api/analyze-growth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    alert(result.recommendation);
  };

  return (
    <div className="container mt-5">
      <h2>Business Growth Analyzer</h2>
      <form onSubmit={handleSubmit}>
        <input name="monthlySales" placeholder="Monthly Sales (last 6 months)" onChange={handleChange} />
        <input name="productCount" placeholder="Number of Products" onChange={handleChange} />
        <input name="customerCount" placeholder="Total Customers" onChange={handleChange} />
        <input name="repeatCustomerRate" placeholder="Repeat Customer %" onChange={handleChange} />
        <input name="marketingSpend" placeholder="Monthly Marketing Spend" onChange={handleChange} />
        <button type="submit">Analyze</button>
      </form>
    </div>
  );
};

export default BusinessGrowth
