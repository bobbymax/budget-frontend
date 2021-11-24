// import { makeStyles } from '@material-ui/core'
import React from 'react'
// import {Line} from 'react-chartjs-2'
import {Bar} from 'react-chartjs-2'

// const useStyles = makeStyles(theme => ({
//     chartFeel: {
//         bac
//     }
// }))

const LineChart = ({paramss}) => {

    const data = {
        labels: paramss.months,
        datasets: [
            {
                label: 'Actual Budget Performace 2021 (M)',
                data: paramss.act,
                borderColor: ['rgba(255, 206, 86, 0.2)'],
                backgroundColor: ['rgba(255, 206, 86, 0.7'],
                pointBorderColor: 'rgba(255, 206, 86, 0.2)',
                pointBackgroundColor: 'rgba(255, 206, 86, 0.7',
            },
            {
                label: 'Expected Budget Performace 2021 (M)',
                data: paramss.exp,
                borderColor: ['rgba(198, 80, 182, 0.2)'],
                backgroundColor: ['rgba(198, 80, 182, 0.7'],
                pointBorderColor: 'rgba(198, 80, 182, 0.2)',
                pointBackgroundColor: 'rgba(198, 80, 182, 0.7',
            }
        ]
    }

    return (
        <>
            {/* <Line data={data} />   */}
            <Bar data={data} />
        </>
    )
}

export default LineChart
