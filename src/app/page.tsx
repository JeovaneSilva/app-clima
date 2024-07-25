"use client";

import {
  FaDroplet,
  FaWind,
  FaMagnifyingGlass,
  FaTemperatureArrowUp,
  FaTemperatureArrowDown,
} from "react-icons/fa6";
import { useState } from "react";
import Card from "@/components/CardDados";
import { getWeather } from "@/services/api";
import Loading from "./loading";

export default function Home() {
  const [res, setRes] = useState(false);
  const [loading, setLoading] = useState(false);

  const [city, Setcity] = useState("");
  const [nameCity, setNameCity] = useState("");
  const [temperatura, setTemperatura] = useState(0);
  const [tempMax, setTempMax] = useState(0);
  const [tempMin, setTempMin] = useState(0);
  const [descricao, setDescricao] = useState(" ");
  const [humidade, setHumidade] = useState("");
  const [velocidade, setVelocidade] = useState("");
  const [srcIcon, setSrcIcon] = useState("");

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
      setSrcIcon(
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      );
      setHumidade(`${data.main.humidity}%`);
      setVelocidade(`${data.wind.speed}Km/h`);
      setRes(true);
      console.log(data.sys.sunrise);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setRes(false);
    } finally {
      setLoading(false);
    }
  };

  const searchCity = (e: any) => {
    const cityForm = city.trim();
    e.preventDefault();
    showWeather(cityForm);
    setRes(true);
  };

  const date = new Date();
  const monName: string[] = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "Maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  return (
    <main className="w-full h-full flex flex-col justify-center items-center">
      <header className="w-full flex flex-col items-center justify-center">
        <form
          onSubmit={searchCity}
          className="flex flex-col justify-center items-center"
        >
          <h1 className="text-4xl mt-[1rem]">Clima</h1>
          <div className="mt-[1rem] flex justify-center items-center border-2 border-blue-950 rounded-[12px] ">
            <input
              className="w-[200px] h-[40px] sm:w-[250px] rounded-[12px] bg-transparent outline-none pl-[10px] text-xl"
              name="namecity"
              onChange={(e) => {
                Setcity(e.target.value);
              }}
              autoComplete="off"
            />
            <button
              className=" text-2xl p-2 rounded-[12px]"
              onClick={searchCity}
            >
              <FaMagnifyingGlass />
            </button>
          </div>
        </form>
      </header>

      <section className="mt-[2rem] flex justify-center items-center">
        {loading ? (
          <Loading />
        ) : res ? (
          <div className="w-[100vw] flex flex-col justify-evenly items-center mt-14 sm:flex-row">
            <div className="flex flex-col gap-7 sm:flex-row sm:ml-16">
              <div className="flex flex-col justify-center items-center sm:items-start">
                <h2 className="text-3xl mb-[0] sm:mb-[-10px]">{nameCity}</h2>
                <p className="text-9xl flex sm:text-[140px] sm:ml-[-15px]">
                  {temperatura}
                  <span className="text-8xl mt-2 sm:mt-3">°</span>{" "}
                </p>
                <p className="text-2xl mt-[0] z-10 sm:text-3xl">
                  {date.getDate()} de {monName[date.getMonth()]} -{" "}
                  {date.getFullYear()}
                </p>
              </div>
              <div className=" flex flex-col justify-center items-center mt-[-25px] sm:ml-[-70px]">
                <img className="w-[100px]" src={srcIcon} alt="" />
                <p className="text-xl font-bold">{descricao}</p>
              </div>
            </div>
            <div className="w-[90vw] h-[250px] grid grid-cols-2 place-items-center p-5 bg-white/30 rounded-[20px] mt-12 sm:w-[450px] sm:mt-0">
              <Card icon={<FaTemperatureArrowUp />} content={tempMax} />
              <Card icon={<FaTemperatureArrowDown />} content={tempMin} />
              <Card icon={<FaWind />} content={velocidade} />
              <Card icon={<FaDroplet />} content={humidade} />
            </div>
          </div>
        ) : (
          <div className="text-xl sm:text-3xl">
            Insira uma cidade para buscar seu clima
          </div>
        )}
      </section>
    </main>
  );
}
