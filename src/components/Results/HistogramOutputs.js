import { useEffect, useState } from "react";
import useEcharts from "react-hooks-echarts";
import echarts from "echarts";
import { useSelector } from "react-redux";


const OutputHistogram = () => {
  const [chartRef, ref] = useEcharts();
  const [chartNumber, setChartNumber] = useState(0);

  const hist_data = useSelector(
    (state) => state.varResultsReducer.histogram.output
  );

  useEffect(() => {
    const chart = chartRef.current;
    chart.setOption({
      title: [
        {
          left: "center",
          text: `f`,
          textStyle: {
            fontSize: 32,
            fontStyle: "oblique",
            fontWeight: "normal",
          },
        },
      ],
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {},
          dataView: {},
          dataZoom: {
            yAxisIndex: "none",
          },
          restore: {},
        },
      },
      xAxis: {
        type: "category",
        data: hist_data[chartNumber]["bin_centers"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: hist_data[chartNumber]["bin_size"],
          type: "bar",
          color: "#fac858",
        },
      ],
    });
  }, [chartRef, hist_data, chartNumber]);

  return (
    <div
      ref={ref}
      className="chart"
      style={{ height: 400, marginTop: "2.2rem" }}
    ></div>
  );
};

export default OutputHistogram;
