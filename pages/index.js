// import MindsDB from "mindsdb-js-sdk";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { useState } from "react";
import teams from "../teams";

Chart.register(CategoryScale);
export default function Home() {
  // console.log(response);
  const [eplTeams, setEplTeam] = useState(teams);
  const [teamForm, setTeamForm] = useState({
    homeTeam: "",
    awayTeam: "",
  });

  const handleChange = (e) => {
    setTeamForm((prevTeamData) => {
      return {
        ...prevTeamData,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (teamForm.homeTeam === teamForm.awayTeam) {
      console.log("both teams are the same");
    }
    console.log("predicting score");
  };
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
    <div>
      <h1 className="text-3xl font-bold underline">
        Welcome to English premier league forecast
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          list="hometeams"
          name="homeTeam"
          placeholder="pick home team"
          onChange={handleChange}
          value={teamForm.homeTeam}
          className="px-3 py-2 border rounded-lg"
        />
        VS
        <datalist id="hometeams">
          {eplTeams.map((team) => (
            <option value={team.name} />
          ))}
        </datalist>
        <input
          list="awayteams"
          name="awayTeam"
          placeholder="pick away team"
          onChange={handleChange}
          value={teamForm.awayTeam}
          className="px-3 py-2 border rounded-lg"
        />
        <datalist id="awayteams">
          {eplTeams.map((team) => (
            <option value={team.name} />
          ))}
        </datalist>
        <button className="px-3 py-2 border rounded-lg text-white bg-blue-500 hover:bg-blue-800">
          Predict
        </button>
      </form>

      <div className="bg-purple-900 w-full p-8 flex flex-col gap-2 justify-center items-center">
        <h2 className="text-white font-bold text-lg">Stamford Bridge</h2>
        <h4 className="text-purple-300 font-medium text-sm">Week 10</h4>
        <div className="w-full flex justify-between items-center">
          <div className="flex-col justify-center items-center text-center">
            <div className="w-16 h-16 bg-blue-600"></div>
            <h2 className="text-white font-bold text-lg">Chelsea</h2>
            <h4 className="text-purple-300 font-medium text-sm">Home</h4>
          </div>
          <div className="flex-col justify-center items-center text-center">
            <div className="flex-row justify-between items-center text-white font-bold">
              <span>1</span>
              <span>:</span>
              <span>1</span>
            </div>
            <h4 className="mt-2 bg-green-300 text-green-900 font-bold rounded-full border-2 border-green-900 px-3 py-2 text-sm">90+4</h4>
          </div>
          <div className="flex-col justify-center items-center text-center">
            <div className="w-16 h-16 bg-red-600"></div>
            <h2 className="text-white font-bold text-lg">Man United</h2>
            <h4 className="text-purple-300 font-medium text-sm">Away</h4>
          </div>
        </div>
      </div>

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
      {/* <div>
        <h2>weater : {response.value}</h2>
        <pre>{JSON.stringify(response, null, 4)}</pre>
      </div> */}
    </div>
  );
}

// export async function getServerSideProps() {
//   const connectionParams = {
//     host: process.env.SUPERBASE_HOST,
//     port: process.env.SUPERBASE_PORT,
//     database: process.env.SUPERBASE_DB,
//     user: process.env.SUPERBASE_USER,
//     password: process.env.SUPERBASE_PASS,
//   };
//   const regressionTrainingOptions = {
//     select: "SELECT * FROM matchstats",
//     integration: "supabase",
//   };
//   let ScorePredictorModel;
//   try {

//     await MindsDB.connect({
//       user: process.env.MINDDB_USER,
//       password: process.env.MINDDB_PASS,
//     });

//     // Can also use MindsDB.Databases.getAllDatabases() to get all databases.
//     const db = await MindsDB.Databases.getDatabase("sup_datasource");
//     if (!db) {
//       const sup = await MindsDB.Databases.createDatabase(
//         "sup_datasource",
//         "supabase",
//         connectionParams
//       );

//       ScorePredictorModel = await MindsDB.Models.trainModel(
//         "score_predictor_model",
//         "FTR",
//         "mindsdb",
//         regressionTrainingOptions
//       );
//     }
//     console.log("con---->>>>",db);

//     // console.log("value ==>", weatherPrediction.value);
//     // console.log("explain ==>", weatherPrediction.explain);
//     // console.log("data ==>", weatherPrediction.data);
//     // console.log("res ==>", [response]);
//   } catch (error) {
//     // Failed to authenticate.
//     console.log(error);
//   }

//   ScorePredictorModel = await MindsDB.Models.getModel(
//     "score_predictor_model",
//     "mindsdb"
//   );

//   const queryOptions = {
//     where: [
//       'date = "2023-04-20"',
//       "temp_max = 12.0",
//       "temp_min = 1.2",
//       "wind = 0.3",
//     ],
//   };
//   const weatherPrediction = await ScorePredictorModel.query(queryOptions);
//   const response = weatherPrediction;
//   // console.log("res ==>", [response]);
//   return {
//     props: { },
//   };
// }
