import React from "react";
//import "components/DayList.scss";
import DayListItem from "./DayListItem";

//const classNames = require('classnames');


export default function DayList(props) {

  const dayListItems = props.days.map((day) => {
    return <DayListItem
      name={day.name} 
      spots={day.spots} 
      selected={day.name === props.day}
      setDay={props.setDay}
      key={day.id.toString()}
    />
  });

  
  
  return (
    <ul>
      {dayListItems}
    </ul> 
  );
}