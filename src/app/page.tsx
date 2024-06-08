'use client'

import { FaSearch, FaSun,FaWind } from "react-icons/fa";
import { useState } from "react";
import Card from "@/components/CardDados";
import { log } from "console";

const teste = <FaWind />
const test2 = process.env.NEXT_PUBLIC_ANALYTICS_ID

console.log(test2);


export default function Home() {

  const [city,Setcity] = useState("")
  console.log(city);
  

  return (
    <main className="w-full h-full flex flex-col justify-center items-center">
      <header className="w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl mt-[1rem]">Clima</h1>
        <div className="mt-[1rem] flex ">
          <input className="w-[200px] h-[35px] border-blue-500 border-2 rounded-[20px] outline-none pl-[10px]" type="search" name="namecity"

            onChange={(e) =>{Setcity(e.target.value)}}
          />
          <button className="ml-[1rem] text-2xl"><FaSearch /></button>
        </div>
      </header>

      <section className="mt-[2rem] flex flex-col justify-center items-center">
        <h2 className="text-xl">Cascavel</h2>
        <div className="flex flex-col w-full justify-center items-center mt-6">
          <FaSun className="text-yellow-400 text-5xl" />
          <span className="">29°C</span>
        </div>

        <div className="w-[80vw] grid grid-cols-2 place-items-center mt-8">
            <Card icon={teste} content={"Nublado"} />
            <Card icon={teste} content={"Max - Min"} />
            <Card icon={teste} content={20} />
            <Card icon={teste} content={"humidade"} />
        </div>
      </section>
    </main>
  );
}
