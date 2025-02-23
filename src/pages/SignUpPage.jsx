import { SignUp } from '@clerk/clerk-react'
import React, { useEffect, useRef } from "react";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";

const SignUpPage = () => {
  const vantaRef = useRef(null);
  let vantaEffect = useRef(null);

  useEffect(() => {
    const initializeVanta = () => {
      if (!window.THREE) window.THREE = THREE;
      if (window.VANTA && window.VANTA.FOG) {
        vantaEffect.current = window.VANTA.FOG({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: window.innerHeight,
          minWidth: window.innerWidth,
          midtoneColor: 0xf51616,
          lowlightColor: 0xffffff,
          blurFactor: 0.58,
          speed: 1.4,
          zoom: 0.9,
        });
      }
    };

    initializeVanta();
    const handleResize = () => {
      if (vantaEffect.current) {
        vantaEffect.current.resize();
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen">
      <div ref={vantaRef} className="absolute top-0 left-0 w-full h-full min-h-screen"></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="flex-grow flex flex-col items-center justify-center h-max">
          <SignUp />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage