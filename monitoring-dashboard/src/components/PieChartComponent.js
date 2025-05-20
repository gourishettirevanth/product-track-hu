import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#FF8042'];

export default function PieChartComponent({ data }) {
  return (
    <div style={{ width: '100%', height: 250 }}>
      <h3>Purchase Success Rate</h3>
      <PieChart width={400} height={250}>
        <Pie data={data} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius={80}>
          {data.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}