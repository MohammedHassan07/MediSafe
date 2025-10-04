"use client";

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";

export default function ParticleBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine); // load tsparticles engine
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "transparent", // keep page gradient visible
          },
        },
        fullScreen: {
          enable: true,
          zIndex: -1, // particles stay behind your content
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: true, mode: "push" },
            resize: true,
          },
          modes: {
            repulse: { distance: 120, duration: 0.4 },
            push: { quantity: 3 },
          },
        },
        particles: {
          number: {
            value: 50,
            density: { enable: true, area: 800 },
          },
          move: {
            enable: true,
            speed: 2,
            outModes: { default: "bounce" },
          },
          shape: {
            type: ["character"], // custom pharmacy icons
            character: [
              {
                value: "💊", // pill emoji
                font: "Verdana",
                style: "",
                weight: "400",
              },
              {
                value: "⚕️", // medical symbol
                font: "Verdana",
              },
              {
                value: "💉", // syringe
                font: "Verdana",
              },
              {
                value: "🧪", // test tube
                font: "Verdana",
              },
              {
                value: "➕", // medical cross
                font: "Verdana",
              },
            ],
          },
          size: {
            value: { min: 12, max: 20 },
          },
          opacity: { value: 0.8 },
          color: {
            value: ["#16a34a", "#dc2626", "#0ea5e9"], // green, red, blue for pharmacy theme
          },
        },
        detectRetina: true,
      }}
    />
  );
}
