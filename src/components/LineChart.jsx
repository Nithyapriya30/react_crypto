import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';

import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
} from 'chart.js';

// Register the components with ChartJS
ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    CategoryScale
);

const LineChart = ({ sparkline = [], currentPrice, coinName }) => {
  const chartData = {
    labels: sparkline.map((_, index) => `${index + 1}h`),
    datasets: [
      {
        label: 'Price In USD',
        data: sparkline,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: 'linear',
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <Row style={{marginTop:'1rem'}} className="chart-header">
        <Typography.Title level={2} className="chart-title">
          {coinName} Price Chart
        </Typography.Title>
        <Col className="price-container">
          <Typography.Title level={5} className="price-change">
           Current Price : $ {currentPrice}
          </Typography.Title>
        </Col>
      </Row>
      {sparkline.length > 0 ? (
        <Line data={chartData} options={options} />
      ) : (
        <p>Loading chart data...</p>
      )}
    </>
  );
};

export default LineChart;