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
            setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="
                w-screen overflow-hidden
                relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw]
                h-[280px] sm:h-[230px] md:h-[300px] lg:h-[360px] xl:h-[420px]
            "
        >
            <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {slides.map((img, index) => (
                    <img
                        src={img}
                        key={index}
                        alt="hero"
                        className="
                            w-screen min-w-full 
                            h-[280px] sm:h-[230px] md:h-[300px] lg:h-[360px] xl:h-[420px]
                            object-cover
                        "
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;
