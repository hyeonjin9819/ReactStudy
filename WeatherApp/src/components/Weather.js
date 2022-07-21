import {useState, useEffect} from "react";
import rain from "../img/rain.gif";
import "../css/Weather.css";
import clear from "../img/clear.gif";
import cloud from "../img/cloud.jpg";
import snow from "../img/snow.gif";
import thunder from "../img/thunder.gif";
import {Link } from "react-router-dom"


function Home(){
    const [loading, setLoading] = useState(true);
    const [weathers, setWeathers] = useState([]);
    const [bgImage, setBgImage] = useState("");
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    const [index, setIndex] = useState("");
    const onSelect = (e) => {
        setIndex(e.target.value);
    }
    const weatherKey = process.env.REACT_APP_WEATHER

    const getWeathers = async() => {
      const json = await(await fetch(`http://api.openweathermap.org/data/2.5/weather?q=seoul&appid=${weatherKey}`)).json();
      setWeathers({
        id: json.weather[0].id,
        temp: json.main.temp,
        main: json.weather[0].main,
        tempMin: json.main.temp_min,
        tempMax: json.main.temp_max,
        humidity: json.main.humidity,
        icon: json.weather[0].icon,
        name: json.name,
      });
      setLoading(false);
    }

    const weatherIconAdrs = `http://openweathermap.org/img/wn/${weathers.icon}@2x.png`;
    const chBgImg = () => {
        console.log(weathers.id)
        if(weathers.id > 800 && weathers.id<900){
            return cloud;
        }
        else if(weathers.id === 800){
            return clear;
        }
        else if(weathers.id > 600 && weathers.id <700){
            return snow;
        }
        else if(weathers.id >=300 && weathers.id<400 || weathers.id >=500 && weathers.id<600)
            return rain;
        else{
            return thunder;
        }
    }


    // 섭씨 화씨 변환
    var chTemp = (weathers.temp-273.15).toFixed(1)
    var chTempMin = (weathers.tempMin-273.15).toFixed(1)
    var chTempMax = (weathers.tempMax - 273.15).toFixed(1)
    useEffect(()=>{
      getWeathers()
    },[]);

    useEffect(()=>{
        setBgImage(chBgImg);
    },[bgImage]);

    return (
        <div style={{ 
            backgroundImage:`url(${bgImage}), linear-gradient(rgba(90, 90, 90, 0.9), rgba(213, 213, 213, 0.7))`,
            backgroundRepeat: "no-repeat",
            height: '100vh',
            width: '100vw',
            backgroundSize: "cover",
            }}>
                <Link className="link" to ={"/date"}>Calendar</Link>
            {loading ? <h1>Loading...</h1> :
            <div className="textBox">
                <h1 className="title"> Today {weathers.name}</h1>
                <h1 className="text"> {year} . {month} . {date}</h1>
                <h2 className="text">온도 {chTemp} ℃</h2>
                <h2 className="text">{weathers.main}</h2>
                <img src ={weatherIconAdrs}></img>
                <h2 className="text">최저 / 최고 : {chTempMin} /{chTempMax}</h2>
                <h2 className="text">습도 {weathers.humidity}%</h2>
            </div>}
        </div>
    );
}

export default Home;