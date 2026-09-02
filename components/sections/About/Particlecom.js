"use client";

import { useEffect } from "react";

const Particlecom = ({ id = "particles-js" }) => {
  useEffect(() => {
    // Dynamically load particles.js from CDN
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
    script.async = true;

    script.onload = () => {
      if (window.particlesJS) {
        window.particlesJS(id, {
          particles: {
            number: {
              value: 80,
              density: {
                enable: false,
                value_area: 800,
              },
            },
            color: { value: "#0f1d3a" }, // matches --color-navy
            shape: {
              type: "circle",
              stroke: { width: 0, color: "#000000" },
              polygon: { nb_sides: 5 },
              image: { src: "img/github.svg", width: 100, height: 100 },
            },
            opacity: {
              value: 0.25,
              random: false,
              anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
            },
            size: {
              value: 3,
              random: true,
              anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#0f1d3a", // matches --color-navy
              opacity: 0.15,
              width: 1,
            },
            move: {
              enable: true,
              speed: 4,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: { enable: false, rotateX: 600, rotateY: 1200 },
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: true, mode: "repulse" },
              onclick: { enable: true, mode: "push" },
              resize: true,
            },
            modes: {
              grab: { distance: 400, line_linked: { opacity: 1 } },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3,
              },
              repulse: { distance: 200, duration: 0.4 },
              push: { particles_nb: 4 },
              remove: { particles_nb: 2 },
            },
          },
          retina_detect: true,
        });
      }
    };

    document.body.appendChild(script);
  }, [id]);

  return (
    <>
      <div id={id} className="particles-container min-h-full h-full" />
      <style jsx global>{`
        .particles-container {
          position: absolute;
          width: 100%;
          min-height: 100%;
          background-color: #fff;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: 50% 50%;
          z-index: 10;
        }
      `}</style>
    </>
  );
};

export default Particlecom;
