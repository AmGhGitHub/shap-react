import { useEffect } from "react";
import useEcharts from "react-hooks-echarts";
import echarts from "echarts";
import { get_letter } from "../../util/jsUtilityFunctions";


const get_max = (arr, index) => {
    if (arr === undefined || arr.length === 0) {
        return 0
    }
    return arr.reduce((max, arr) => {
        return max >= arr[index] ? max : arr[index];
    }, -Infinity);
}

const get_min = (arr, index) => {
    if (arr === undefined || arr.length === 0) {
        return 0
    }
    return arr.reduce((min, arr) => {
        return min <= arr[index] ? min : arr[index];
    }, Infinity);
}

const ShapResultsChart = ({ features, features_values, features_shap_values }) => {
    console.log(features)

    const min_value = Math.min(...features_values)
    const max_value = Math.max(...features_values)

    const [chartRef, ref] = useEcharts();
    useEffect(() => {
        const chart = chartRef.current;

        const series_data = []

        for (let i = 0; i < features_values.length; i++) {
            const _data = [features_values[i], features_shap_values[i], features_values[i]]
            series_data.push(_data)
        }

        chart.setOption({
            // title: {
            //     text: 'SHAP Values'
            // },
            visualMap: [
                {
                    type: 'continuous',
                    dimension: 2,
                    orient: 'vertical',
                    top: 'middle',
                    right: -10,
                    min: min_value,
                    max: max_value,
                    text: features,
                    textGap: 20,
                    textStyle: {
                        fontSize: 20,
                        fontWeight: 'bold'
                    },
                    calculable: true,
                    inRange: {
                        color: ['#008bfb', '#ff0e51']
                    }
                }
            ],
            xAxis: {
                name: features,
                nameLocation: 'middle',
                nameGap: 20,
                nameTextStyle: {
                    fontSize: 20,
                    fontWeight: 'bold'
                },
            },
            yAxis: {
                name: features + ' Shap value',
                nameLocation: 'middle',
                nameGap: 20,
                nameTextStyle: {
                    fontSize: 20,
                    fontWeight: 'bold'
                },
            },
            series: [{
                symbolSize: 8,
                data: series_data,
                type: 'scatter'
            }]
        });
    }, [chartRef, features_shap_values, features]);

    return (
        <div
            ref={ref}
            className="chart"
            style={{ height: 500 }}
        ></div>
    );
}

export default ShapResultsChart;