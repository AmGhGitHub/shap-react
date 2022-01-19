import { useEffect, useState } from "react";
import useEcharts from "react-hooks-echarts";
import echarts from "echarts";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { useSelector } from "react-redux";
import { get_letter } from "../util/jsUtilityFunctions";

const colors = {
  blue: "#5470c6",
  light_green: "#91cc75",
  yellow: "#fac858",
  red: "#ee6666",
  firoozeh: "#73c0de",
  dark_green: "#3ba272",
  orange: "#fc8452",
};
const OutputHistogram = () => {
  const [chartRef, ref] = useEcharts();
  const [chartNumber, setChartNumber] = useState(0);

  const { outputHistogramData: hist_data } = useSelector(
    (state) => state.varResultsReducer
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
          color: "#d9534f",
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
