import { useEffect } from "react";
import useEcharts from "react-hooks-echarts";
import echarts from "echarts";
import { get_letter } from "../../util/jsUtilityFunctions";


const ShapValuesChart = ({ features, values }) => {



    const [chartRef, ref] = useEcharts();

    useEffect(() => {
        const chart = chartRef.current;

        const series_data = []

        for (let i = 0; i < values.length; i++) {
            const _data = values[i]
            // const colors = []
            // for (let j = 0; j < _data.length; j++) {
            //     colors.push(Math.random())
            // }
            series_data.push({
                type: 'scatter',
                data: _data,
                // color: colors
            })
        }

        console.log(series_data)

        chart.setOption({
            title: {
                text: 'SHAP Values'
            },
            visualMap: [
                {
                    type: 'continuous',
                    dimension: 2,
                    orient: 'vertical',
                    right: 0,
                    top: 'middle',
                    min: -1,
                    max: 1,
                    text: ['High', 'Low'],
                    calculable: true,
                    inRange: {
                        color: ['#008bfb', '#ff0e51']
                    }
                }
            ],
            xAxis: {
                type: 'value',
                axisLabel: {
                    show: true,
                    fontSize: 18,
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: function (value, index) {
                        return get_letter(value - 1);

                    },
                    fontSize: 18,
                    showMinLabel: false,
                },
                min: 0,
                minInterval: 1,
                maxInterval: 1
            },
            // series: [{
            //     type: 'scatter',
            //     data: [

            //         [1, 1, -1],
            //         [0.5, 1, -.8],
            //         [-2, 1, 1],
            //     ]
            // }]
            series: series_data
        });
    }, [chartRef, values, features]);


    return (
        <div
            ref={ref}
            className="chart"
            style={{ height: 500 }}
        ></div>
    );


}

export default ShapValuesChart;