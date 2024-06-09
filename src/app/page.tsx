'use client'

import { FaDroplet,FaWind, FaMagnifyingGlass,FaTemperatureArrowUp  } from "react-icons/fa6";
import { useState } from "react";
import Card from "@/components/CardDados"
import { getWeather } from "@/services/api";

export default function Home() {

  const [city,Setcity] = useState("")
  const [nameCity,SetNameCity] = useState("")
  const [temperatura,SetTemperatura] = useState(0)
  const [tempMax,SetTemMax] = useState(0)
  const [tempMin,SetTemMin] = useState(0)
  const [descricao,SetDescricao] = useState(" ")
  const [humidade,setHumidade] = useState("")
  const [velocidade,setVelocidade] = useState("")
  const [srcIcon,setSrcIcon] = useState("")


  const showWheater = async (city:string) => {
    const data = await getWeather(city)
    const temp = parseInt(data.main.temp)

    SetNameCity(data.name)
    SetTemperatura(temp)
    SetTemMax(200)
    SetDescricao(data.weather[0].description)
    setSrcIcon(`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    setHumidade(`${data.main.humidity}%`)
    setVelocidade(`${data.wind.speed}Km/h`)
  }

  const searchCity = () =>{
    showWheater(city)
  }
  
  return (
    <main className="w-full h-full flex flex-col justify-center items-center">
      <header className="w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl mt-[1rem]">Clima</h1>
        <div className="mt-[1rem] flex justify-center items-center ">
          <input className="w-[200px] h-[35px] border-blue-500 border-2 rounded-[20px] outline-none pl-[10px]" type="search" name="namecity"

            onChange={(e) =>{Setcity(e.target.value)}}
          />
          <button className="ml-[1rem] text-2xl bg-blue-500 p-2 rounded-[8px]" onClick={searchCity}><FaMagnifyingGlass /></button>
        </div>
      </header>

      <section className="mt-[2rem] flex flex-col justify-center items-center">
        <h2 className="text-xl">{nameCity}</h2>
        <div className="flex flex-col w-full justify-center items-center mt-6">
          <span className="">{temperatura+" °C"}</span>
          <img src={srcIcon} alt="" />
          <p>{descricao}</p>
        </div>

        <div className="w-[80vw] grid grid-cols-2 place-items-center mt-8">
            <Card icon={<FaTemperatureArrowUp />} content={"max"} />
            <Card icon={<FaWind />} content={"Min"} />
            <Card icon={<FaWind />} content={velocidade} />
            <Card icon={<FaDroplet />} content={humidade} />
        </div>
      </section>
    </main>
  );
}
