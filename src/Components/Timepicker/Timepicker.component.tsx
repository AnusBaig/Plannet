import React, { useState,useEffect } from "react";
import { TimepickerWrapperStyled, TimepickerStyled } from "./Timepicker.styled";

interface TimepickerProps {
  onChange(x: any): void;
  name?: string | undefined;
  label?: string | undefined;
  value?: string | undefined;
}

const Timepicker: React.FunctionComponent<TimepickerProps> = (props) => {
  const [state, setState] = useState({ minutes: "00", hours: "00" });
  const hours = [...Array(24)];
  const minutes = [...Array(60)];
  const [hrs, setHrs] = useState('00')
  const [mins, setMins] = useState('00')
  const handleState = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = { ...state, [ev.target.name]: ev.target.value };
    //@ts-ignore
    props.onChange(newState, props.name);
    setState(newState);
  };
  useEffect(() => {
    //@ts-ignore    
    if (props.value && props.value.includes(':')) {
      //@ts-ignore     
      let arr = props.value.split(':')
      setHrs(arr[0])
      setMins(arr[1])
      setState({ minutes: arr[1], hours: arr[0] })
     console.log('arr', arr)
    } else {
      setHrs('00')
      setMins('00')
    }
  //@ts-ignore  
  }, [props.value]);
  return (
    <div>
      <p style={{color: '#89939a'}}>{
        //@ts-ignore    
        props.label
        }</p>
      <TimepickerWrapperStyled>
        <TimepickerStyled name="hours" onChange={handleState} value={hrs}>
          {hours.map((_, i) => (
            <option key={i} value={i < 10 ? "0" + i : i}>
              {i < 10 ? "0" : ""}
              {i}
            </option>
          ))}
        </TimepickerStyled>
        <p style={{ fontSize: '28px', fontWeight: 'bold',padding: '0 5px'}}>:</p>
        <TimepickerStyled name="minutes" onChange={handleState} value={mins}>
          {minutes.map((_, i) => (
            <option key={i} value={i < 10 ? "0" + i : i}>
              {i < 10 ? "0" : ""}
              {i }
            </option>
          ))}
        </TimepickerStyled>
      </TimepickerWrapperStyled>
    </div>  
  );
};

export default Timepicker;
