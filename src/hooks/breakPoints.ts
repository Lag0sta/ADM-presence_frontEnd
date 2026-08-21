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

export function useXXS() {
  const [isXXS, setIsXXS] = useState(
    window.innerWidth >= 360 &&
    window.innerWidth < 480
  );

  useEffect(() => {
    const handleResize = () => {
      setIsXXS(
        window.innerWidth >= 360 &&
        window.innerWidth < 480
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isXXS;
}

export function useXS() {
  const [isXS, setIsXS] = useState(
    window.innerWidth >= 480 &&
    window.innerWidth < 640
  );

  useEffect(() => {
    const handleResize = () => {
      setIsXS(
        window.innerWidth >= 480 &&
        window.innerWidth < 640
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isXS;
}

export function useSM() {
  const [isSM, setIsSM] = useState(
    window.innerWidth >= 640 &&
    window.innerWidth < 768
  );

  useEffect(() => {
    const handleResize = () => {
      setIsSM(
        window.innerWidth >= 640 &&
        window.innerWidth < 768
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isSM;
}

export function useMD() {
  const [isMD, setIsMD] = useState(
    window.innerWidth >= 768 &&
    window.innerWidth < 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMD(
        window.innerWidth >= 768 &&
        window.innerWidth < 1024
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMD;
}

export function useLG() {
  const [isLG, setIsLG] = useState(
    window.innerWidth >= 1024 &&
    window.innerWidth < 1280
  );

  useEffect(() => {
    const handleResize = () => {
      setIsLG(
        window.innerWidth >= 1024 &&
        window.innerWidth < 1280
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isLG;
}

export function useXL() {
  const [isXL, setIsXL] = useState(
    window.innerWidth >= 1280 &&
    window.innerWidth < 1536
  );

  useEffect(() => {
    const handleResize = () => {
      setIsXL(
        window.innerWidth >= 1280 &&
        window.innerWidth < 1536
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isXL;
}


export function use2XL() {
  const [is2XL, setIs2XL] = useState(
    window.innerWidth >= 1536 &&
    window.innerWidth < 1536
  );

  useEffect(() => {
    const handleResize = () => {
      setIs2XL(
        window.innerWidth >= 1536 
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return is2XL;
}