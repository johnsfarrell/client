import React, { useState } from "react";

export function Typewriter({ text }: any) {
  const [displayedText, setDisplayedText] = useState("");
  const [typing, setTyping] = useState(true);
  const [currentChar, setCurrentChar] = useState(1);
  const delay = 50;

  function type(tick: any) {
    if (!typing) return;

    setDisplayedText(text.substring(0, currentChar));
    setCurrentChar(currentChar + 1);

    if (currentChar + 1 > text.length) {
      setCurrentChar(1);
      tick = 5000;
    }

    //   let typeTimer = setTimeout(function () {
    //     type(delay);
    //   }, tick);
    // }

    // function startTyping() {
    //   if (currentChar > 1) {
    //     setTyping(true);
    //     return type(delay);
    //   }

    //   type(delay);
    // }

    // function pauseTyping() {
    //   typing = false;
    // }

    return (
      <div>
        <p>{displayedText}</p>
        <button onClick={type}>Start Typing</button>
        <button onClick={() => setDisplayedText(text)}>Show All</button>
      </div>
    );
  }
}
