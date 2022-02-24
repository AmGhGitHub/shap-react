import { useEffect } from "react";
import useEcharts from "react-hooks-echarts";
import echarts from "echarts";

const PredictionChart = ({ pred_data, r2_value, symbol_color, minVal = 0.0, maxVal = 0.0 }) => {
    const [chartRef, ref] = useEcharts();

    useEffect(() => {
        const chart = chartRef.current;

        const markLineOpt = {
            animation: true,
            label: {
                formatter: `R2 =${r2_value}`,
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
    }, [chartRef, pred_data, r2_value, symbol_color]);


    return (
        <div
            ref={ref}
            className="chart"
            style={{ height: 500 }}
        ></div>
    );


}

export default PredictionChart;