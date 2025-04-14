import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const COLORS = ['#007BFF', '#1E3A8A', '#3B82F6', '#93C5FD'];

export default function App() {
  const [formData, setFormData] = useState({
    age: 30,
    income: 60000,
    expense: 30000,
    cash: 100000,
    stocks: 150000,
    funds: 80000,
    realEstate: 500000,
    debt: 100000,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: Number(value) });
  };

  const assetData = [
    { name: '現金', value: formData.cash },
    { name: '股票', value: formData.stocks },
    { name: '基金', value: formData.funds },
    { name: '不動產', value: formData.realEstate },
  ];

  const netAsset = formData.cash + formData.stocks + formData.funds + formData.realEstate - formData.debt;
  const cashflow = formData.income - formData.expense;
  const projection = Array.from({ length: 10 }, (_, i) => ({
    year: `${formData.age + i}`,
    asset: netAsset + cashflow * 12 * i,
  }));

  return (
    <div style={{ background: '#0f172a', color: '#fff', minHeight: '100vh', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold' }}>財務分析儀表板</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginTop: '2rem' }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h2>輸入資料</h2>
          {[
            { label: '年齡', name: 'age' },
            { label: '月收入', name: 'income' },
            { label: '月支出', name: 'expense' },
            { label: '現金', name: 'cash' },
            { label: '股票', name: 'stocks' },
            { label: '基金', name: 'funds' },
            { label: '不動產', name: 'realEstate' },
            { label: '負債總額', name: 'debt' },
          ].map(({ label, name }) => (
            <div key={name} style={{ marginBottom: '1rem' }}>
              <label>{label}</label>
              <input
                type="number"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
              />
            </div>
          ))}
        </div>

        <div style={{ flex: 2, minWidth: '300px' }}>
          <h2>資產配置</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={assetData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {assetData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <h2 style={{ marginTop: '2rem' }}>資產增長預測</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={projection}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="asset" stroke="#3B82F6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}