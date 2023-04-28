import Image from "next/image";

export default function Footer() {
  return (
    <div className="bg-indigo-900 mx-auto w-full text-white p-8 flex flex-col gap-2 justify-center items-center">
      <p>MindsDB Hackathon 2023</p>
      <div className="flex space-x-4 justify-center items-center">
        <Image src="/images/mindsdbim.png" alt="mindsdb" width={50} height={50} priority className="w-full h-full" />
        <Image src="/images/supabase-logo-wordmark--dark.png" alt="supabase" width={100} height={100} priority className="w-full h-full" />
      </div>
      <p>&copy; aladdin 2023. All right reversed</p>
      
    </div>
  );
}
