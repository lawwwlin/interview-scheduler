import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // set mode and save previous to history 
  //if replace is true then replace last mode with current
  function transition(newMode, replace = false) {
    if (replace) {
      history.pop();
    }
    setMode(newMode);
    history.push(newMode);
    setHistory([...history]);
  };

  // go back to last mode and update history
  function back() {
    if (history[history.length - 1] !== initial) {
      history.pop();
      setMode(history[history.length - 1]);
    }
  };
  
  return { mode, transition, back };
};