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
