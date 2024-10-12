import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";

function FlashSale() {
  const [timeLeft, setTimeLeft] = useState(0);

  const calculateTimeLeft = useCallback(() => {
    const deadline = new Date("Oct 16, 2024 00:00:00").getTime();
    const now = new Date().getTime();
    return Math.max(0, deadline - now);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const TimeUnit = ({ value, unit }: { value: number; unit: string }) => (
    <div className="flex flex-col items-center space-y-5 mb-10">
      <div className="text-4xl font-bold tabular-nums">
        {value.toString().padStart(2, "0")}
      </div>
      <div className="text-sm uppercase">{unit}</div>
    </div>
  );

  return (
    <div className="rounded-lg w-full max-w-6xl mx-auto bg-gradient-to-r moonastroid flex flex-col lg:flex-row justify-between p-8 text-white">
      <div className="flex flex-col gap-y-6 items-start justify-center lg:w-3/5">
        <h3 className="text-xl font-semibold">Xiaomi 14 Ultra</h3>
        <p className="text-5xl lg:text-6xl font-bold capitalize leading-tight">
          Capture every moment
        </p>
        <p className="p-1">15% off</p>
        <div className="flex gap-x-6 bg-white/10 rounded-lg p-4 backdrop-blur-md shadow-lg">
          <TimeUnit value={days} unit="Days" />
          <TimeUnit value={hours} unit="Hours" />
          <TimeUnit value={minutes} unit="Minutes" />
          <TimeUnit value={seconds} unit="Seconds" />
        </div>
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-full transition duration-300">
          Purchase Now
        </Button>
      </div>
      <div className="mt-8 lg:mt-0 lg:w-2/5 flex items-center justify-center">
        <img
          src="/images/xiaomi-14-ultra-3-removebg-preview.png"
          alt="Xiaomi 14 Ultra"
          className="max-w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}

export default FlashSale;
