import React, { useEffect } from "react";
import useEcharts from "react-hooks-echarts";
import echarts from "echarts";

const VarsHistogram = ({ hist_data }) => {
  const [chartRef, ref] = useEcharts();

  useEffect(() => {
    const chart = chartRef.current;
    chart.setOption({
      xAxis: {
        type: "category",
        data: hist_data[0]["bin_centers"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: hist_data[0]["bin_size"],
          type: "bar",
        },
      ],
    });
  }, [chartRef, hist_data]);

  return <div ref={ref} className="chart" style={{ height: 800 }}></div>;
};

export default VarsHistogram;
