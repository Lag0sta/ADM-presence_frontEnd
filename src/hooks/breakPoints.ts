import { useEffect, useState } from "react";

export function useXXXS() {
  const [isXXXS, setIsXXXS] = useState(
    window.innerWidth >= 320 &&
    window.innerWidth < 360
  );

  useEffect(() => {
    const handleResize = () => {
      setIsXXXS(
        window.innerWidth >= 320 &&
        window.innerWidth < 360
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isXXXS;
}