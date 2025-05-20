import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import AreaChartComponent from './AreaChartComponent';
import PieChartComponent from './PieChartComponent';
import BarChartComponent from './BarChartComponent';
import ErrorTable from './ErrorTable';

const socket = io("http://localhost:4000");

export default function Dashboard() {
  const [purchaseData, setPurchaseData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    socket.on("dashboardData", (data) => {
      setPurchaseData(data.purchaseStatus);
      setPieData(data.successRate);
      setBarData(data.bestSelling);
      setErrors(data.topErrors);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <AreaChartComponent data={purchaseData} />
        <PieChartComponent data={pieData} />
      </div>
      <div style={{ display: 'flex', gap: 20, marginTop: 30 }}>
        <BarChartComponent title="Best Selling Item IDs" data={barData} />
        <ErrorTable errors={errors} />
      </div>
    </div>
  );
}