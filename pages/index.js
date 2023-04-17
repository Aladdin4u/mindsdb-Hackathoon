import MindsDB from "mindsdb-js-sdk";

export default function Home() {
  // console.log(response);
  return (
    <div className="text-3xl font-bold underline">Welcome to Next.js!</div>
  );
}

export async function getStaticProps(context) {
  const connectionParams = {
    base_id: process.env.AIRTABLE_BASE_ID,
    table_name: process.env.AIRTABLE_TABLE_NAME,
    api_key: process.env.AIRTABLE_API_KEY,
  };
  const regressionTrainingOptions = {
    select: "SELECT * FROM weather",
    integration: "airtable_datasource",
  };
  try {
    const db = await MindsDB.connect({
      user: process.env.MINDDB_USER,
      password: process.env.MINDDB_PASS,
    });
    console.log("connected to mindsdb", db);
    // const airDatabase = await MindsDB.Databases.createDatabase(
    //   "airtable_datasource",
    //   "airtable",
    //   connectionParams
    // );
    // console.log("connected to airtable", airDatabase);
    // let WeatherPredictorModel = await MindsDB.Models.trainModel(
    //   "weather_predictor_model",
    //   "weather",
    //   "mindsdb",
    //   regressionTrainingOptions
    // );

    // // // Wait for the training to be complete. This is just a simple example. There are much better ways to do this.
    // console.log("after awaiting integration", WeatherPredictorModel)
    // while (WeatherPredictorModel.status === "completed") {
    // }
    let WeatherPredictorModel = await MindsDB.Models.getModel(
      "weather_predictor_model",
      "mindsdb"
    );

    const queryOptions = {
      where: [
        'date = "2012-01-03"',
        "temp_max = 11.7",
        "temp_min = 7.2",
        "wind = 2.3",
      ],
    };
    const weatherPrediction = await WeatherPredictorModel.query(queryOptions);
    const response = await weatherPrediction;
    console.log("value ==>",weatherPrediction.value);
    console.log("wxplain ==>",weatherPrediction.explain);
    console.log("data ==>",weatherPrediction.data);
    console.log("res ==>",response);
  } catch (error) {
    console.log(error);
    // Failed to authenticate.
  }

  // try {
  //   // MindsDB.Models.retrainModel has the same interface for retraining models.
  //   // The returned promise resolves when the model is created, NOT when training is actually complete.

  // } catch (error) {
  //   // Something went wrong training or querying.
  // }
  return {
    props: {},
  };
}
