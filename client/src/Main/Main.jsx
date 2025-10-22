import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar';
import BackToTop from '../Shared/BackToTop/BackToTop';
import Footer from '../Shared/Footer/Footer';
import FloatingContact from '../Shared/FloatingContact/FloatingContact';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HelmetChanger from '../Shared/Helmet/Helmet';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence } from 'framer-motion';
import PageTransition from '../Shared/PageTransition/PageTransition';

const Main = () => {
  const location = useLocation();
  const lenisRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
      disable: false,
      offset: 50,
      anchorPlacement: 'top-bottom',
    });

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  useEffect(() => {
    // Remove all AOS animations first
    const aosElements = document.querySelectorAll('[data-aos]');
    aosElements.forEach(el => {
      el.classList.remove('aos-animate');
      el.classList.add('aos-init');
    });

    // Scroll to top instantly when route changes
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Force refresh AOS after a short delay
    setTimeout(() => {
      AOS.refresh();
    }, 150);
  }, [location.pathname]);
  return (
    <>
      <HelmetChanger />
      <Navbar />
      <BackToTop />
      <FloatingContact />
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <Outlet />
        </PageTransition>
      </AnimatePresence>
      <Footer />
    </>
  );
};
export default Main;
