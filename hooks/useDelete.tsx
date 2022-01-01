import { useEffect, useState } from "react";

export const useDelete = (): [boolean, () => void] => {
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowDelete(false);
    }, 3000);
    if (!setShowDelete) {
      () => clearTimeout(timeout);
    }
    return () => clearTimeout(timeout);
  }, [showDelete]);

  return [showDelete, () => setShowDelete(true)];
};
