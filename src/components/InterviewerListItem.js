import React from "react";
import "components/InterviewerListItem.scss";

//const classNames = require('classnames');

export default function InterviewerListItem(props) {

  return (
    <li className="interviewers__item">
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.name}
    </li>

  );
}