import { useEffect, useState } from "react";
import useEcharts from "react-hooks-echarts";
import echarts from "echarts";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { useSelector } from "react-redux";
import { get_letter } from "../../util/jsUtilityFunctions";

const VarsHistogram = () => {
  const [chartRef, ref] = useEcharts();
  const [chartNumber, setChartNumber] = useState(0);

  const hist_data = useSelector(
    (state) => state.varResultsReducer.histogram.inputs
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
          text: `${get_letter(chartNumber)}`,
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
          color: "#0275d8",
        },
      ],
    });
  }, [chartRef, hist_data, chartNumber]);

  return (
    <div>
      <ButtonToolbar aria-label="Toolbar with button groups">
        <ButtonGroup className="me-2" aria-label="First group">
          {hist_data.map((_, i) => {
            return (
              <Button key={i} onClick={(e) => handleClick(i, e)}>
                {get_letter(i)}
              </Button>
            );
          })}
        </ButtonGroup>
      </ButtonToolbar>
      <div ref={ref} className="chart" style={{ height: 400 }}></div>
    </div>
  );
};

export default VarsHistogram;
