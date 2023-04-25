import MindsDB from "mindsdb-js-sdk";

export default async function handler(req, res) {
  const { homeTeam, awayTeam } = req.body;
  console.log("teeeee", req.body);
  if (req.method === "POST") {
    const connectionParams = {
      host: process.env.SUPERBASE_HOST,
      port: process.env.SUPERBASE_PORT,
      database: process.env.SUPERBASE_DB,
      user: process.env.SUPERBASE_USER,
      password: process.env.SUPERBASE_PASS,
    };
    const regressionTrainingOptions = {
      select: "SELECT * FROM matchstats",
      integration: "sup_datasource",
      groupBy: ["FTHG", "FTAG"],
    };
    let ScorePredictorModel;
    try {
      await MindsDB.connect({
        user: process.env.MINDDB_USER,
        password: process.env.MINDDB_PASS,
      });

      // Can also use MindsDB.Databases.getAllDatabases() to get all databases.
      const db = await MindsDB.Databases.getDatabase("sup_datasource");
      if (!db) {
        const sup = await MindsDB.Databases.createDatabase(
          "sup_datasource",
          "supabase",
          connectionParams
        );

        ScorePredictorModel = await MindsDB.Models.trainModel(
          "ft2_scores_model",
          "FTR",
          "mindsdb",
          regressionTrainingOptions
        );
      }
    } catch (error) {
      // Failed to authenticate.
      console.log(error);
    }

    ScorePredictorModel = await MindsDB.Models.getModel(
      "ft2_scores_model",
      "mindsdb"
    );

    let queryOptions = {
      // Join model to this data source.
      join: "sup_datasource.matchstats",
      where: [`t.HomeTeam = "${homeTeam}"`, `t.AwayTeam = "${awayTeam}"`],
    };

    const FTPrediction = await ScorePredictorModel.batchQuery(queryOptions);
    res.status(201).json(FTPrediction);
  } else {
    res.status(200).json({ name: "John Doe" });
    // Handle any other HTTP method
  }
}
