import { useEffect, useState } from "react";
import useEcharts from "react-hooks-echarts";
import echarts from "echarts";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { useSelector } from "react-redux";
import { get_letter } from "../util/jsUtilityFunctions";

const OutputHistogram = () => {
  const [chartRef, ref] = useEcharts();
  const [chartNumber, setChartNumber] = useState(0);

  const { outputHistogramData: hist_data } = useSelector(
    (state) => state.varResultsReducer
  );

  const handleClick = (i, e) => {
    setChartNumber(i);
  };

  useEffect(() => {
    const chart = chartRef.current;
    chart.setOption({
      title: [
        {
          left: "center",
          text: `Output`,
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
