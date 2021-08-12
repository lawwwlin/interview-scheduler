// return list of appointment objects
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

// return list of interviewer objects
export function getInterviewersForDay(state, day) {
  const result = [];
  const targetDay = state.days.find(obj => obj.name === day);
  if (!state.days || !targetDay) {
    return result;
  }
  for (const interviewerId of targetDay.interviewers) {
    result.push(state.interviewers[interviewerId]);
  }
  return result;
}

// return list of interview objects
export function getInterview(state, interview) {
  const targetInterview = {};
  if (!interview) {
    return null;
  }
  targetInterview.student = interview.student;
  targetInterview.interviewer = state.interviewers[interview.interviewer];
  return targetInterview;
}
