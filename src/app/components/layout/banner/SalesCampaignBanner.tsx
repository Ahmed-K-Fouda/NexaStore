"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

function SalesCampaignBanner() {
  const { push } = useRouter();

  const initialTime = 24 * 60 * 60 - 1; 
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000); 

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full bg-gradient-to-r from-red-600 via-orange-500 to-red-600 py-3 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-white">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-bold animate-bounce">
              🔥
            </span>
            <div className="text-sm sm:text-base font-bold">
              FLASH SALE ENDS IN:
            </div>
            <div className="bg-white/20 px-2 py-1 font-mono font-bold rounded">
              <span className='pulse animate_[pulse_infinite]'>{formatTime(timeLeft)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">⚡</span>
            <span className="font-bold text-yellow-200 animate-pulse">
              UP TO 95% OFF!
            </span>
          </div>

          <button
            className="bg-white text-red-600 px-4 py-1 rounded-full font-bold text-sm hover:bg-yellow-100 transition-colors shadow-lg"
            onClick={() => {
              push("/");
            }}
          >
            SHOP NOW!
          </button>
        </div>
      </div>
    </div>
  );
}

export default SalesCampaignBanner;