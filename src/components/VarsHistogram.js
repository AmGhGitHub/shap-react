import { useEffect, useState } from "react";
import useEcharts from "react-hooks-echarts";
import echarts from "echarts";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

const VarsHistogram = ({ hist_data }) => {
  const [chartRef, ref] = useEcharts();
  const [chartNumber, setChartNumber] = useState(0);

  const handleClick = (i, e) => {
    setChartNumber(i);
  };

  useEffect(() => {
    const chart = chartRef.current;
    chart.setOption({
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
    <div className="dflex justify-content-center">
      <ButtonToolbar aria-label="Toolbar with button groups">
        <ButtonGroup className="me-2" aria-label="First group">
          {hist_data.map((_, i) => {
            return (
              <Button key={i} onClick={(e) => handleClick(i, e)}>
                {i}
              </Button>
            );
          })}
        </ButtonGroup>
      </ButtonToolbar>
      <div ref={ref} className="chart" style={{ height: 350 }}></div>
    </div>
  );
};

export default VarsHistogram;
