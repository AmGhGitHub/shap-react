import { useEffect } from "react";
import useEcharts from "react-hooks-echarts";
import echarts from "echarts";
import { roundNumber } from "../../util/jsUtilityFunctions";

const getRangeValues = (arr) => {
    const first_element = [].concat(...arr.map(x => x[0]))
    const second_element = [].concat(...arr.map(x => x[1]))

    return {
        minVal: Math.floor(Math.min(...first_element, ...second_element)),
        maxVal: Math.ceil(Math.max(...first_element, ...second_element)),
    }
}

const PredictionChart = ({ pred_data, r2_value, symbol_color }) => {
    const [chartRef, ref] = useEcharts();

    const { minVal, maxVal } = getRangeValues(pred_data)

    useEffect(() => {
        const chart = chartRef.current;

        const markLineOpt = {
            animation: true,
            label: {
                formatter: `R2 =${roundNumber(r2_value)} `,
                align: 'right'
            },
            lineStyle: {
                type: 'solid'
            },
            data: [
                [
                    {
                        coord: [minVal, minVal],
                        symbol: 'none'
                    },
                    {
                        coord: [maxVal, maxVal],
                        symbol: 'none'
                    }
                ]
            ]
        };


        chart.setOption({
            xAxis: {
                min: minVal,
                max: maxVal,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            },
            yAxis: {
                min: minVal,
                max: maxVal,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            },
            series: [
                {
                    data: pred_data,
                    type: "scatter",
                    markLine: markLineOpt,
                    symbolSize: 8,
                    itemStyle: {
                        color: symbol_color,
                        borderColor: '#555'
                    },
                },
            ],
        });
    }, [chartRef, pred_data, r2_value]);


    return (
        <div
            ref={ref}
            className="chart"
            style={{ height: 500 }}
        ></div>
    );


}

export default PredictionChart;