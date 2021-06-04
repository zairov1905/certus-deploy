import React, { useEffect } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { loadEmployees } from "../employees/employeesActions";

export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadEmployees());
  }, []);
  const { employees } = useSelector((state) => state.employees);

  const series = [...employees.map((employee) => employee.performance)];
  const chartOptions = {
    labels: [...employees.map((employee) => employee.firstname)],
    legend: { position: "bottom" },
    
  };
  const basicBar = {
    options: {
      chart: {
        id: "basic-bar",
      },
      // fill: {
      //   type: 'gradient',
      //   gradient: {
      //     shade: 'white',
      //     type: "vertical",
      //     shadeIntensity: 0.5,
      //     gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      //     inverseColors: true,
      //     opacityFrom: 1,
      //     opacityTo: 1,
      //     stops: [0, 50, 100],
      //     colorStops: []
      //   }
      // }, 
      colors:['#F44336', '#E91E63', '#9C27B0','#F44336', '#E91E63', '#9C27B0','#F44336', '#E91E63', '#9C27B0','#F44336', '#E91E63', '#9C27B0'],
      xaxis: {
        categories: [
          "Yanvar",
          "Fevral",
          "Mart",
          "Aprel",
          "May",
          "Iyun",
          "Iyul",
          "Avqust",
          "Sentyabr",
          "Oktyabr",
          "Noyabr",
          "Dekabr"
        ],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91, 70,72,80],
      },
    ],
  };

  return (
    <React.Fragment>
      {/* BEGIN HOMEPAGE CONTAINER */}

      <div className="layout-px-spacing">
        <div className="row layout-top-spacing">
          <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
            <div className="widget">
              <div className="widget-heading">
                <h5>Xərc</h5>
              </div>
              <div className="widget-content widget-content-area">
                <Chart
                  options={basicBar.options}
                  series={basicBar.series}
                  type="bar"
                  width="100%"
                  height="302"
                />
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
            <div className="widget">
              <div className="widget-heading">
                <h5>İşçilər-Performans</h5>
              </div>
              <div className="widget-content widget-content-area">
                <Chart
                  options={chartOptions}
                  series={series}
                  type="pie"
                  width="100%"
                  height="400"

                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* END HOMEPAGE CONTAINER */}
    </React.Fragment>
  );
}
