import { useState } from "react";
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      history.pop();
    }
    setMode(newMode);
    history.push(newMode);
    setHistory([...history]);
  };

  function back() {
    if (history[history.length - 1] !== initial) {
      history.pop();
      setMode(history[history.length - 1]);
    }
  };
  
  return { mode, transition, back };
}

