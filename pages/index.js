import { useState } from "react";
import axios from "axios";
import Stats from "../components/Stats";
import Loader from "../components/Loader";
import teams from "../teams";

export default function Home() {
  const [eplTeams, setEplTeam] = useState(teams);
  const [teamForm, setTeamForm] = useState({
    homeTeam: "",
    awayTeam: "",
  });
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setTeamForm((prevTeamData) => {
      return {
        ...prevTeamData,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (teamForm.homeTeam === teamForm.awayTeam) {
      setTeamForm({ homeTeam: "", awayTeam: "" });
      return alert("both teams are the same, choose different teams");
    }
    try {
      const res = await axios.post("/api/teamSelection", teamForm);
      setData(res.data);
      setTeamForm({ homeTeam: "", awayTeam: "" });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      return alert("Network error, retry!!!");
    }
  };
  const bgImage = {
    backgroundImage: 'url("/images/stadium.jpg")',
  };
  return (
    <div className="bg-cover bg-center bg-local" style={bgImage}>
      <div className=" mx-auto max-w-4xl p-8 flex flex-col gap-2 justify-center items-center">
        <h1 className="text-3xl text-white font-bold">
          Predictor match outcome
        </h1>

        <form
          onSubmit={handleSubmit}
          className="w-full gap-4 flex flex-col py-14 justify-center items-center"
        >
          {loading && <Loader />}
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
              <option value={team.name} key={team.name} />
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
              <option value={team.name} key={team.name} />
            ))}
          </datalist>
          <button disabled={loading ? "disabled" : ""} className="mt-4 w-full px-3 py-2 rounded-lg text-white text-xl justify-center items-center uppercase font-bold bg-blue-500 hover:bg-blue-800 focus:ring focus:ring-blue-500 focus:ring-offset-2">
            {loading ? "Predicting..." : "Predict"}
          </button>
        </form>
        
        {data && <Stats matchdetails={data[0].data} />}
      </div>
    </div>
  );
}
