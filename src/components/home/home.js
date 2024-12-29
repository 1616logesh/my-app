import anime from 'animejs/lib/anime.es.js';
import React, { useEffect, useRef } from 'react';
import './home.css';
import { Routes, Route, Link } from 'react-router-dom';
import About from '../header/About';
import Offer from '../header/offer';
import Training from '../header/training';
import Contact from '../header/contact';
import Home1 from '../header/home1';
import Dashboard from '../header/dashboard';

function Home() {
  const backgroundRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const background = backgroundRef.current;
    if (!background) return;

    // Clear existing blocks
    background.innerHTML = '';

    // Create blocks
    const blocks = [];
    for (let i = 0; i < 100; i++) {
      const block = document.createElement("div");
      block.classList.add("block");
      background.appendChild(block);
      blocks.push(block);
    }

    // Define the animation function using Anime.js
    const animateBlocks = () => {
      if (animationRef.current) {
        animationRef.current.pause();
      }

      animationRef.current = anime({
        targets: blocks,
        translateX: () => anime.random(-700, 700),
        translateY: () => anime.random(-300, 300),
        scale: () => anime.random(1, 3),
        easing: 'easeInOutQuad',
        duration: 3000,
        delay: anime.stagger(10),
        complete: (anim) => {
          if (background.contains(blocks[0])) {
            animateBlocks();
          }
        },
      });
    };

    // Start the animation
    animateBlocks();

    // Cleanup function
    return () => {
      if (animationRef.current) {
        animationRef.current.pause();
      }
      if (background) {
        background.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="home">
      <div className="background" ref={backgroundRef}>
      </div>
      <nav className="menu">
        <div className="logo">GENIELEARN TECHNOLOGIES</div>
        <div className="menu-links">
          <div className="menu-items"><Link to="/home">Home</Link></div>
          <div className="menu-items"><Link to="/about">About</Link></div>
          <div className="menu-items"><Link to="/offer">Offer</Link></div>
          <div className="menu-items"><Link to="/training">Training</Link></div>
          <div className="menu-items"><Link to="/contact">Contact</Link></div>
        </div>
      </nav>
      
      <div className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/home" element={<Home1 />} />
          <Route path="/about" element={<About />} />
          <Route path="/offer" element={<Offer />} />
          <Route path="/training" element={<Training />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}

export default Home;
