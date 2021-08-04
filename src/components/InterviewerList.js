import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

//const classNames = require('classnames');

export default function InterviewerList(props) {

  const interviewerListItems = props.interviewers.map((interviewer) => {
    return <InterviewerListItem
      name={interviewer.name}
      avatar={interviewer.avatar}
      key={interviewer.id}
      selected={interviewer.id === props.value}
      setInterviewer={(event) => props.onChange(interviewer.id)}
    />
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerListItems}</ul>
    </section>
  );
}