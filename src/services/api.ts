// 148246e153ee8aeaab6fadbaa0c8ef0c
const apiUrl = process.env.NEXT_PUBLIC_URL_API
const apikey = process.env.NEXT_PUBLIC_API_KEY

export const getWeather = async(city:string) =>{
    const apiWeatherUrl = `${apiUrl}q=${city}&units=metric&appid=${apikey}&lang=pt_br`

    const res = await fetch(apiWeatherUrl)
    const data = await res.json()
    console.log(data)

    return data
}