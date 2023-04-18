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
    await MindsDB.connect({
      user: process.env.MINDDB_USER,
      password: process.env.MINDDB_PASS,
    });
    
    let WeatherPredictorModel;
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

    WeatherPredictorModel = await MindsDB.Models.getModel(
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
    console.log("value ==>", weatherPrediction.value);
    console.log("explain ==>", weatherPrediction.explain);
    console.log("data ==>", weatherPrediction.data);
    console.log("res ==>", response);
  } catch (error) {
    // Failed to authenticate.
    console.log(error);
  }
  return {
    props: {},
  };
}
