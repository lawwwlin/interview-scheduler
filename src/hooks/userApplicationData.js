import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get('api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers'),
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  const setDay = day => setState({ ...state, day });

  const updateSpots = (state, day) => {
    const currentDay = day || state.day;
    const currentDayObj = state.days.find(obj => obj.name === currentDay);
    const currentDayObjIndex = state.days.findIndex(obj => obj.name === currentDay);
    const appointmentIds = currentDayObj.appointments;
    // if the interview is null then there is a spot
    const freeSpots = appointmentIds.filter(id => !state.appointments[id].interview);
    const totalSpots = freeSpots.length; 

    const updatedState = {...state}
    updatedState.days = [...state.days]
    const updatedDay = {...currentDayObj}
    updatedDay.spots = totalSpots;
    updatedState.days[currentDayObjIndex] = updatedDay;

    return updatedState;
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState(prev => ({...prev, appointments}))
        setState(prev => updateSpots({...prev, appointments}));
    });
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
      setState(prev => ({...prev, appointments}))
      setState(prev => updateSpots({...prev, appointments}));
    });
  };

  return {state, setDay, bookInterview, cancelInterview};
};