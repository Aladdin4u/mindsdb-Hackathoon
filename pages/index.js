import MindsDB from "mindsdb-js-sdk";

export default function Home({ response }) {
  console.log(response);
  return (
    <div className="text-3xl font-bold underline">Welcome to Next.js!</div>
  );
}
async function conectDB() {
  const connectionParams = {
    user: process.env.POSTGRES_USER,
    port: process.env.POSTGRES_PORT,
    password: process.env.POSTGRES_PASS,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
  };
  try {
    await MindsDB.connect({
      user: process.env.MINDDB_USER,
      password: process.env.MINDDB_PASS,
    });
    const pgDatabase = await MindsDB.Databases.createDatabase(
      "psql_datasource",
      "postgres",
      connectionParams
    );
  } catch (error) {
    console.log(error);
    // Failed to authenticate.
  }
}
conectDB();
export async function getStaticProps(context) {
  const regressionTrainingOptions = {
    select: "SELECT * FROM demo_data.home_rentals",
    integration: "example_db",
  };

  try {
    // MindsDB.Models.retrainModel has the same interface for retraining models.
    // The returned promise resolves when the model is created, NOT when training is actually complete.
    let homeRentalPriceModel = await MindsDB.Models.trainModel(
      'home_rentals_model',
      'rental_price',
      'mindsdb',
      regressionTrainingOptions);

    // // Wait for the training to be complete. This is just a simple example. There are much better ways to do this.
    while (homeRentalPriceModel.status === 'training') {
      homeRentalPriceModel = await MindsDB.Models.getModel(
        "home_rentals_model",
        "mindsdb"
      );
    }

    const queryOptions = {
      where: [
        "sqft = 823",
        'location = "good"',
        'neighborhood = "downtown"',
        "days_on_market = 10",
      ],
    };

    const rentalPricePrediction = homeRentalPriceModel.query(queryOptions);
    const response = rentalPricePrediction.json();
    console.log(rentalPricePrediction.value);
    console.log(rentalPricePrediction.explain);
    console.log(rentalPricePrediction.data);
  } catch (error) {
    // Something went wrong training or querying.
  }
  return {
    props: { response },
  };
}
