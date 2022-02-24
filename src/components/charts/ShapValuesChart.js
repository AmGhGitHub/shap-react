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
            series_data.push({
                type: 'scatter',
                data: values[i],

            })
        }

        chart.setOption({
            title: {
                text: 'SHAP Values'
            },
            xAxis: {
                type: 'value',
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: function (value, index) {
                        return value < 0 ? "" : get_letter(value - 1);

                    },
                    fontSize: 18,
                },
                min: 0,
                minInterval: 1,
                maxInterval: 1
            },
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