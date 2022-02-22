import { useEffect } from "react";
import useEcharts from "react-hooks-echarts";
import echarts from "echarts";
import { roundNumber } from "../../util/jsUtilityFunctions";

const getFeatureImportanceParams = (arr) => {
    const names = [].concat(...arr.map(x => x[0]));
    const values = [].concat(...arr.map(x => x[1]));
    return { features: names, featureImportanceValues: values }
}

const ShapValuesChart = ({ feature_importance }) => {

    const { features, featureImportanceValues } = getFeatureImportanceParams(feature_importance);

    const [chartRef, ref] = useEcharts();

    useEffect(() => {
        const chart = chartRef.current;

        chart.setOption({
            title: {
                text: 'Feature Importance',
            },
            xAxis: {
                type: 'value',
                axisLine: {
                    show: true
                },
                axisLabel: {
                    show: true,
                    fontSize: 18,
                }
            },
            yAxis: {
                type: 'category',
                data: features,
                axisLabel: {
                    show: true,
                    fontSize: 18,
                }
            },
            series: [
                {
                    type: 'bar',
                    data: featureImportanceValues,
                    color: '#3ba272'
                },
            ],
        });
    }, [chartRef, featureImportanceValues, features]);


    return (
        <div
            ref={ref}
            className="chart"
            style={{ height: 500 }}
        ></div>
    );


}

export default ShapValuesChart;