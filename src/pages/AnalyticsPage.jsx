// src/pages/AnalyticsPage.jsx
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const AnalyticsPage = () => {
  const issues = useSelector(state => state.issues.items);
  const [categoryData, setCategoryData] = useState({});
  const [resolvedData, setResolvedData] = useState({});

  useEffect(() => {
    // Calculate the most reported issues by category
    const categoryCount = issues.reduce((acc, issue) => {
      acc[issue.category] = (acc[issue.category] || 0) + 1;
      return acc;
    }, {});
    setCategoryData(categoryCount);

    // Calculate resolved percentage
    const resolvedCount = issues.filter(issue => issue.status === 'Resolved').length;
    const totalCount = issues.length;
    setResolvedData({
      resolved: (resolvedCount / totalCount) * 100,
      total: totalCount,
    });
  }, [issues]);

  const categoryChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: 'Most Reported Issues by Category',
        data: Object.values(categoryData),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div >
    
      <h1 className="text-2xl font-bold" >Analytics</h1>

      <div>
        <h2 className="font-semibold">Most Reported Issues by Category</h2>
        <Bar data={categoryChartData} />
      </div>

      <div>
        <h3 className="font-semibold">Resolved Percentage</h3>
        <p>{resolvedData.resolved}% of issues have been resolved out of {resolvedData.total} reported issues.</p>
      </div>
    </div>
  );
};

export default AnalyticsPage;
