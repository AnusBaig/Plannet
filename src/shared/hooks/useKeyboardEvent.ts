import { useEffect, useState } from "react";

function useKeyboardEvent(code: string) {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const keyboardEventListener = (event: KeyboardEvent) => {
      if (event.code === code) {
        setKeyPressed(true);
      }
    };

    document.addEventListener("keydown", keyboardEventListener);
    return () => document.removeEventListener("keydown", keyboardEventListener);
  }, [code]);

  return { keyPressed, setKeyPressed };
}

export { useKeyboardEvent };
