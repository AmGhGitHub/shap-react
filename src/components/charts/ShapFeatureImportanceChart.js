import { useEffect } from "react";
import useEcharts from "react-hooks-echarts";
import echarts from "echarts";

const ShapFeatureImportancePlot = ({ features, feature_importance_values }) => {
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
                    data: feature_importance_values,
                    color: '#3ba272'
                },
            ],
        });
    }, [chartRef, feature_importance_values, features]);

    return (
        <div
            ref={ref}
            className="chart"
            style={{ height: 500 }}
        ></div>
    );
}

export default ShapFeatureImportancePlot;