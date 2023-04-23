import Image from "next/image";
import teams from "../teams";

export default function Navbar() {
  return (
    <div className="backdrop-blur-sm bg-white/30  mx-auto w-full p-4 flex gap-2 justify-center items-center">
      <h1 className="text-blue-500 text-2xl font-bold uppercase mr-auto">EPL Predictor</h1>
      <ul className="hidden lg:flex flex-wrap space-x-4">
        {teams.map((team) => (
          <li>
            <Image src={team.logo} width={16} height={16} alt={team.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}
