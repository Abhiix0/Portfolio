import '@fontsource/space-grotesk/300.css';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/500.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// IMPORTANT: ScrollTrigger must be registered here once, globally, before any component mounts.
// Do not remove or move this registration.
gsap.registerPlugin(ScrollTrigger);

createRoot(document.getElementById("root")!).render(<App />);
