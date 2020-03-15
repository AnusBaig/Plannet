import { useState, useRef, useEffect } from "react";

interface FormInputConfig {
  initialValue?: string;
}

function useInput({ initialValue = "" }: FormInputConfig = {}) {
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(initialValue);
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function validateValue() {
      if (!ref.current || !dirty) {
        return;
      }

      setError(ref.current.checkValidity() === false);
    }
    validateValue();
  }, [dirty, value]);

  function onChange(event: React.ChangeEvent<HTMLInputElement> | any) {
    const { value } = event.target;

    if (!dirty) {
      setDirty(true);
    }
    if (ref.current) {
      setValue(value);
    }
  }

  return { ref, value, dirty, onChange, error, setValue, setError };
}

export { useInput };
