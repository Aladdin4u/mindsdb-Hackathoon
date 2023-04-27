import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
Chart.register(CategoryScale);

export default function Chartjs() {
  const Data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  const data = {
    labels: Data.map((row) => row.year),
    datasets: [
      {
        label: "Acquisitions by year",
        data: Data.map((row) => row.count),
      },
    ],
    backgroundColor: ["blue", "red", "green", "purple"],
  };
  return (
    <div className="w-[18] h-[18]">
      <h2>Pie Chart</h2>
      <Bar
        data={data}
        options={{
          Plugin: {
            title: {
              display: true,
              text: "Users gained between 2010-2016",
            },
          },
        }}
      />
    </div>
  );
}
