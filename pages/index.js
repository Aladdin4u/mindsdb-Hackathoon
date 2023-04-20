import MindsDB from "mindsdb-js-sdk";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

Chart.register(CategoryScale);
export default function Home({ response }) {
  console.log(response);
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
    backgroundColor: [
      "blue","red","green","purple"
    ],
  };
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Welcome to weater forecast
      </h1>

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
      <div>
        <h2>weater : {response.value}</h2>
        <pre>{JSON.stringify(response, null, 4)}</pre>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const connectionParams = {
    base_id: process.env.AIRTABLE_BASE_ID,
    table_name: process.env.AIRTABLE_TABLE_NAME,
    api_key: process.env.AIRTABLE_API_KEY,
  };
  const regressionTrainingOptions = {
    select: "SELECT * FROM weather",
    integration: "airtable_datasource",
  };
  let WeatherPredictorModel;
  try {
    await MindsDB.connect({
      user: process.env.MINDDB_USER,
      password: process.env.MINDDB_PASS,
    });

    // Can also use MindsDB.Databases.getAllDatabases() to get all databases.
    const db = await MindsDB.Databases.getDatabase("airtable_datasource");
    if (!db) {
      await MindsDB.Databases.createDatabase(
        "airtable_datasource",
        "airtable",
        connectionParams
      );
      WeatherPredictorModel = await MindsDB.Models.trainModel(
        "weather_predictor_model",
        "weather",
        "mindsdb",
        regressionTrainingOptions
      );
    }

    // console.log("value ==>", weatherPrediction.value);
    // console.log("explain ==>", weatherPrediction.explain);
    // console.log("data ==>", weatherPrediction.data);
    console.log("res ==>", [response]);
  } catch (error) {
    // Failed to authenticate.
    console.log(error);
  }
  WeatherPredictorModel = await MindsDB.Models.getModel(
    "weather_predictor_model",
    "mindsdb"
  );

  const queryOptions = {
    where: [
      'date = "2023-04-20"',
      "temp_max = 12.0",
      "temp_min = 1.2",
      "wind = 0.3",
    ],
  };
  const weatherPrediction = await WeatherPredictorModel.query(queryOptions);
  const response = weatherPrediction;
  console.log("res ==>", [response]);
  return {
    props: { response },
  };
}
