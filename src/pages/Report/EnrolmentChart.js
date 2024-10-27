import React from 'react';
import Chart from 'react-apexcharts';

const EnrolmentChart = () => {
  const series = [
    {
      name: 'Variance',
      data: [31, 17, 11, 24, 13, 24, 120, 46],
      color: '#e74c3c' // Red color for Variance
    },
    {
      name: 'Current Total',
      data: [21, 35, 41, 28, 67, 56, 248, 0],
      color: '#3498db' // Blue color for Current Total
    },
    {
      name: 'Target',
      data: [0, 0, 0, 0, 0, 0, 0, 294.4],
      color: '#27ae60' // Green color for Target
    }
  ];

  const options = {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
      },
    },
    xaxis: {
      categories: ['Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun', 'Total', 'Target'],
    },
    yaxis: {
      labels: {
        formatter: (value) => `${value}%`
      },
      max: 100
    },
    legend: {
      position: 'top',
    },
    fill: {
      opacity: 1
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#fff']
      }
    }
  };

  return (
    <div className="hougang-capacity-chart">
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default EnrolmentChart;
