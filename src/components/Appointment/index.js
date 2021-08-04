import React, { Fragment } from 'react'
import "components/Appointment/styles.scss";
import { action } from "@storybook/addon-actions";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

//const classNames = require('classnames');


export default function Appointment(props) {

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {props.interview && (
       <Fragment>
         <Show 
          student={props.interview.student} 
          interviewer={props.interview.interviewer}
        />
       </Fragment>)}
      {!props.interview && (
       <Fragment>
         <Empty onClick={"onAdd"}/>
       </Fragment>)}
    </article>
  );
}