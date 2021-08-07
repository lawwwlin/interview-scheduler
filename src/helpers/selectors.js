export function getAppointmentsForDay(state, day) {
  const result = [];
  const targetDay = state.days.find(obj => obj.name === day);
  if (!targetDay) {
    return result;
  }
  // appointmentId is just an integer of appointment id
  for (const appointmentId of targetDay.appointments) {
    result.push(state.appointments[appointmentId]);
  }
  return result;
}

export function getInterviewersForDay(state, day) {
  const result = [];
  if (!state.days) {
    return result;
  }
  const appointments = getAppointmentsForDay(state, day);
  // appointments is list of appointment objects
  for (const appointment of appointments) {
    if (appointment.interview) {
      const interviewerId = appointment.interview.interviewer;
      result.push(state.interviewers[interviewerId]);
    }
  }
  return result;
}

export function getInterview(state, interview) {
  const targetInterview = {};
  if (!interview || !interview.student || !interview.interviewer) {
    return null;
  }
  targetInterview.student = interview.student;
  targetInterview.interviewer = state.interviewers[interview.interviewer];
  return targetInterview;
}
