import React, { useState } from 'react'
import "components/Appointment/styles.scss";

import InterviewerList from "../InterviewerList";
import Button from "../Button";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setName("");
    setInterviewer(null);
  };

  const cancel = () => {
    props.onCancel();
  };

  const submit = () => {
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={name || ""}
            onChange={(e) => {setName(e.target.value)}}
            placeholder="Enter Student Name"
            />
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={(e) => {
          console.log(e);
          setInterviewer(e)}
          } />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger
            onClick={() => {
              reset();
              cancel();
            }}
          >Cancel</Button>
          <Button confirm onClick={submit}>Save</Button>
        </section>
      </section>
    </main>
  );
}