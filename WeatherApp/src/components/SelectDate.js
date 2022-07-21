import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "../css/SelectDate.css";

function SelectDate() {
  const [value, onChange] = useState(new Date());
  const [exercise, setExercise] = useState("");
  const [exList, setExList] = useState([]);
  const [check, setCheck] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if(exercise === ""){
      return;
    }
    setExercise("");
    setExList(currentArray => [exercise, ...currentArray]);
  }

  const saveData =() => {
    const exerciseObj = {exerName: exercise};
    const date = {todayDate: value}
    window.localStorage.setItem("exercise", JSON.stringify(exerciseObj));
    window.localStorage.setItem("date", JSON.stringify(date));
  };

    // const callData = () => {
    //   setCheck(true);
    // };

  const exerChange = (e) => {
    setExercise(e.target.value);
    setCheck(false);
  };

  return (
    <div>
      <Calendar onChange={onChange} value={value} />
      <form onSubmit={onSubmit}>
      <input className='input' name ="excercise" value={exercise} onChange={exerChange} placeholder ="운동 종류 입력" ></input>
      <button className='btn' onClick={saveData}>저장하기</button>
      {/* <button className='btn' onClick={callData}> 불러오기</button> */}
      {/* {check && value == window.localStorage.getItem("date") ? <p>{window.localStorage.getItem("time")}</p> : <> </>} */}
      {/* {check ? <p>{window.localStorage.getItem("exercise").split(":")[1]}</p> : <> </>}
      {check ? <p>{window.localStorage.getItem("date").split('"')[3]}</p> : <> </>} */}
      </form>
      <ul>
        {exList.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    </div>
  );
}

export default SelectDate;