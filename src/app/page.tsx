'use client'

import { FaDroplet,FaWind, FaMagnifyingGlass,FaTemperatureArrowUp,FaTemperatureArrowDown   } from "react-icons/fa6";
import { useState } from "react";
import Card from "@/components/CardDados"
import { getWeather } from "@/services/api";
import Loading from "./loading";

export default function Home() {

  const [res,setRes] = useState(false)
  const [loading, setLoading] = useState(false);

  const [city,Setcity] = useState("")
  const [nameCity,setNameCity] = useState("")
  const [temperatura,setTemperatura] = useState(0)
  const [tempMax,setTempMax] = useState(0)
  const [tempMin,setTempMin] = useState(0)
  const [descricao,setDescricao] = useState(" ")
  const [humidade,setHumidade] = useState("")
  const [velocidade,setVelocidade] = useState("")
  const [srcIcon,setSrcIcon] = useState("")

  const showWeather = async (city: string) => {
    setLoading(true);
    try {
      const data = await getWeather(city);
      const temp = parseInt(data.main.temp);

      setNameCity(data.name);
      setTemperatura(temp);
      setTempMax(data.main.temp_max);
      setTempMin(data.main.temp_min);
      setDescricao(data.weather[0].description);
      setSrcIcon(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
      setHumidade(`${data.main.humidity}%`);
      setVelocidade(`${data.wind.speed}Km/h`);
      setRes(true);
      console.log(data.sys.sunrise)
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setRes(false);
    } finally {
      setLoading(false);
    }
  };

  const searchCity = () =>{
      showWeather(city);
      setRes(true);
  }
  
  return (
    <main className="w-full h-full flex flex-col justify-center items-center">
      <header className="w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl mt-[1rem]">Clima</h1>
        <div className="mt-[1rem] flex justify-center items-center ">
          <input className="w-[200px] h-[35px] border-blue-950 border-2 rounded-[20px] outline-none pl-[10px]" type="search" name="namecity"

            onChange={(e) =>{Setcity(e.target.value)}}
          />
          <button className="ml-[1rem] text-2xl bg-white p-2 rounded-[8px]" onClick={searchCity}><FaMagnifyingGlass /></button>
        </div>
      </header>

      <section className="mt-[2rem] flex flex-col justify-center items-center">
        {loading ? (
          <Loading/>
        ) : res ? (
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col w-full justify-center items-center mt-6">
                <h2 className="text-2xl mb-3">{nameCity}</h2>
                <span className="text-6xl text-white">{temperatura+" °C"}</span>
                <img className="w-[100px] mt-5" src={srcIcon} alt="" />
                <p className="text-xl font-bold mt-[-15px] text-">{descricao}</p>
              </div>
              <div className="w-[80vw] h-[200px] grid grid-cols-2 place-items-center p-5 bg-white mt-12 rounded-[18px]">
                  <Card icon={<FaTemperatureArrowUp />} content={tempMax} />
                  <Card icon={<FaTemperatureArrowDown />} content={tempMin} />
                  <Card icon={<FaWind />} content={velocidade} />
                  <Card icon={<FaDroplet />} content={humidade} />
              </div>
            </div>
          
          ) : (
            <div>Insira uma cidade para buscar seu clima</div>
          )}
        </section>
    </main>
  );
}
