import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function AreaChartComponent({ data }) {
  return (
    <div style={{ width: '100%', height: 250 }}>
      <h3>Purchase Status</h3>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#82ca9d" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}