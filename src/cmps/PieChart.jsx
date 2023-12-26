import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart() {

    const data = {
        labels: ['Red', 'Blue', 'Green', 'Purple'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 7, 2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    const options = {
        plugins: {
            legend: {
                position: 'left',
            },
        },
    };

    return (
        <div className='pie-chart' style={{ maxWidth: '100%', maxHeight: '100%'}}>
            <Pie data={data} options={options} />
        </div>
    )
}
