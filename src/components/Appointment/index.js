import React, { Fragment } from 'react'
import "components/Appointment/styles.scss";
import { action } from "@storybook/addon-actions";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {props.interview && (
       <Fragment>
         <Show 
          key={props.id}
          student={props.interview.student} 
          interviewer={props.interview.interviewer}
        />
       </Fragment>)}
      {!props.interview && (
       <Fragment>
         <Empty 
          key={props.id}
          onClick={"onAdd"}/>
       </Fragment>)}
    </article>
  );
}