import React from 'react'
import "components/Appointment/styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from './Form';
import Status from './Status';
import useVisualMode from 'hooks/useVisualMode';
import Confirm from './Confirm';

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview);
    transition(SHOW);
  };

  function remove() {
    transition(DELETING);
    props.cancelInterview(props.id);
    transition(EMPTY)
  };

  console.log('41', props.interview);

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form 
        interviewers={props.interviewers}
        onSave={(name, interviewer) => {save(name, interviewer)}}
        onCancel={() => {back()}}
      />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => {transition(CONFIRM)}}
          onEdit={() => {transition(EDIT)}}
        />
      )}
      {mode === SAVING && (
        <Status message={'Saving'}/>
      )}
      {mode === DELETING && (
        <Status message={'Deleting'}/>
      )}
      {mode === CONFIRM && (
        <Confirm 
        onCancel={() => {transition(SHOW)}}
        onConfirm={() => {remove()}}
        />
      )}
      {mode === EDIT && <Form 
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onSave={(name, interviewer) => {save(name, interviewer)}}
        onCancel={() => {transition(SHOW)}}
      />}
    </article>
  );
}