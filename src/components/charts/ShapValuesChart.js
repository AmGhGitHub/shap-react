import { useEffect } from "react";
import useEcharts from "react-hooks-echarts";
import echarts from "echarts";


const ShapValuesChart = ({ features, shap_values }) => {

    const [chartRef, ref] = useEcharts();

    useEffect(() => {
        const chart = chartRef.current;

        chart.setOption({
            title: {
                text: 'Step Line'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['Step Start', 'Step Middle', 'Step End']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'value',
            },
            yAxis: {
                type: 'category',
                data: features
            },
            series: [
                {
                    type: 'scatter',
                    data: [100, 120]
                },
                {
                    type: 'scatter',
                    data: [110, 130]
                }
            ]

        });
    }, [chartRef, shap_values, features]);


    return (
        <div
            ref={ref}
            className="chart"
            style={{ height: 500 }}
        ></div>
    );


}

export default ShapValuesChart;