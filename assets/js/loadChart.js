export const drawChart1 = (xValues, yValues) => {
    var ctx = document.getElementById("chart1");
    var chart1 = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xValues,
            datasets: [{
                label: 'No. of Transactions',
                data: yValues,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1
            }]
        },
        options: {
            // responsive: false,
            animation: {duration: 0},
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'No. of Transactions'
                    }
                }],
                xAxes : [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Block Height'
                    }
                }]
            }
        }
    });
}

export const drawChart2 = (xValues, yValues) => {
    var ctx = document.getElementById("chart2");
    var chart2 = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xValues,
            datasets: [{
                label: 'Amount (in Satoshi)',
                data: yValues,
                backgroundColor: 'rgb(134,247,125,0.2)',
                borderColor: 'rgb(134,247,125,1)',
                borderWidth: 1
            }]
        },
        options: {
            // responsive: false,
            animation: {duration: 0},
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Amount (in Satoshi)'
                    }
                }],
                xAxes : [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Block Height'
                    }
                }]
            }
        }
    })
}