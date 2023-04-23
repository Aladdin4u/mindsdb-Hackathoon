import Image from "next/image";
import { useState } from "react";
// import MindsDB from "mindsdb-js-sdk";
import Stats from "../components/Stats";
import teams from "../teams";

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
 const bgStyle = {
  backgroundImage: 'url("/images/stadium.jpg")'
 }
  return (
    <div className="bg-cover bg-center bg-local" style={bgStyle}>

    <div className=" mx-auto max-w-4xl p-8 flex flex-col gap-2 justify-center items-center">
      <h1 className="text-3xl text-white font-bold">Predictor match outcome</h1>
      
      <form onSubmit={handleSubmit} className="w-full gap-4 flex flex-col py-14 justify-center items-center">
        <input
          list="hometeams"
          name="homeTeam"
          placeholder="pick home team"
          onChange={handleChange}
          value={teamForm.homeTeam}
          className="w-full px-3 py-2 border rounded-lg"
        />
        <datalist id="hometeams">
          {eplTeams.map((team) => (
            <option value={team.name} />
          ))}
        </datalist>

        <span className="px-3 py-2 text-green-500 font-bold">VS</span>

        <input
          list="awayteams"
          name="awayTeam"
          placeholder="pick away team"
          onChange={handleChange}
          value={teamForm.awayTeam}
          className="w-full px-3 py-2 border rounded-lg"
        />
        <datalist id="awayteams">
          {eplTeams.map((team) => (
            <option value={team.name} />
          ))}
        </datalist>
        <button className="mt-4 w-full px-3 py-2 rounded-lg text-white text-xl justify-center items-center uppercase font-bold bg-blue-500 hover:bg-blue-800 focus:ring focus:ring-blue-500 focus:ring-offset-2">
          Predict
        </button>
      </form>

      <Stats />
      {/* <div>
        <h2>weater : {response.value}</h2>
        <pre>{JSON.stringify(response, null, 4)}</pre>
      </div> */}
    </div>
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
