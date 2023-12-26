import React, { Fragment } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart({ ordersStatus }) {
    const data = {
        labels: ['Pending', 'Approved', 'Rejected'],
        datasets: [
            {
                label: '# of Votes',
                data: ordersStatus,
                pointStyle: 'circle',
                backgroundColor: [
                    'rgba(255, 166, 0, 0.8)',
                    'rgba(101, 191, 56, 0.8)',
                    'rgba(245, 107, 107, 0.8)',
                ],
                borderColor: [
                    'rgba(255, 255, 255, 1)',
                    'rgba(255, 255, 255, 1)',
                    'rgba(255, 255, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    const options = {
        plugins: {
            legend: {
                display: false,
                // position: 'right',

                labels: {
                    // usePointStyle: true,
                    // boxWidth: 40,
                },
            },
        },
    };

    return (
        <div className='doughnut-chart-container'>
            <h1>Reservations status</h1>
            <div style={{ maxWidth: '90%', maxHeight: '90%', alignSelf: 'center' }}>
                <Doughnut data={data} options={options} />
            </div>
            <div className='chart-stats'>
                <article className='pending-stat'>
                    <p>pending</p>
                    <span>{ordersStatus[0]}</span>
                </article>
                <article className='approved-stat'>
                    <p>approved</p>
                    <span>{ordersStatus[1]}</span>
                </article >
                <article className='rejected-stat'>
                    <p>rejected</p>
                    <span>{ordersStatus[2]}</span>
                </article>
            </div>
        </div>
    )
}
