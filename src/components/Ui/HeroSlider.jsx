import { useEffect, useState } from "react";

import s2 from "./../../assets/slider-1.jpg";
import s3 from "./../../assets/slider-2.jpg";
import s4 from "./../../assets/slider-3.jpg";
import s1 from "./../../assets/slider-4.jpg";

const HeroSlider = () => {
    const slides = [s1, s2, s3, s4];
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className=" w-full overflow-hidden h-[350px] md:h-[500px]">

            {/* SLIDER */}
            <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {slides.map((img, index) => (
                    <img
                        src={img}
                        key={index}
                        className="min-w-full h-[450px] md:h-[650px] object-cover"
                        alt=""
                    />

                ))}
            </div>
        </div>
    );
};

export default HeroSlider;
