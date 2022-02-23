import { useEffect } from "react";
import useEcharts from "react-hooks-echarts";
import echarts from "echarts";


const ShapValuesChart = ({ features, values }) => {

    console.log(values)
    // console.log(values[0])

    const [chartRef, ref] = useEcharts();

    useEffect(() => {
        const chart = chartRef.current;

        chart.setOption({
            title: {
                text: 'SHAP Values*'
            },
            xAxis: {
                type: 'value',
            },
            yAxis: {
                type: 'value',
                // data: features
            },
            series: [
                {
                    type: 'line',
                    data: values[1]
                }
            ]

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