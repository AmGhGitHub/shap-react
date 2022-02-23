import { useEffect } from "react";
import useEcharts from "react-hooks-echarts";
import echarts from "echarts";


const ShapValuesChart = ({ features, shap_values }) => {

    const [chartRef, ref] = useEcharts();

    useEffect(() => {
        const chart = chartRef.current;
        
        chart.setOption({
            title: {
                text: 'Dispersion of house price based on the area',
                left: 'center',
                top: 0
            },
            visualMap: {
                min: 15202,
                max: 159980,
                dimension: 1,
                orient: 'vertical',
                right: 10,
                top: 'center',
                text: ['HIGH', 'LOW'],
                calculable: true,
                inRange: {
                    color: ['#f2c31a', '#24b7f2']
                }
            },
            tooltip: {
                trigger: 'item',
                axisPointer: {
                    type: 'cross'
                }
            },
            xAxis: [
                {
                    type: 'value'
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'price-area',
                    type: 'scatter',
                    symbolSize: 5,
                    data: shap_values
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