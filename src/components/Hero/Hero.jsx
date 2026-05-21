import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Hero.module.css';
import LineWaves from '../LineWaves/LineWaves';

const Hero = () => {
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, -50]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const y3 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section className={styles.hero}>
      <LineWaves 
        speed={0.2}
        brightness={0.15}
        color1="#ffffff"
        color2="#ffffff"
        color3="#ffffff"
        innerLineCount={24}
        outerLineCount={40}
      />
      <div className={styles.container}>
        <motion.div 
          className={styles.badge}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className={styles.avatar}>
            <img src="https://framerusercontent.com/images/vBe56549gs4eoEzOSmyUR33ZTjI.png" alt="Duncan Robert" />
          </div>
          <span className={styles.dot}></span>
          <span className={styles.badgeText}>Available for work</span>
        </motion.div>

        <div className={styles.titleWrapper}>
          <motion.h1 style={{ y: y1 }} className={styles.titleLine}>Duncan Robert</motion.h1>
          <motion.h1 style={{ y: y2 }} className={styles.titleLine}>Digital</motion.h1>
          <motion.h1 style={{ y: y3 }} className={styles.titleLine}>Designer</motion.h1>
        </div>

        <div className={styles.bottomRow}>
          <p className={styles.bioFragment}>
            I specialize in building digital experiences that blend aesthetics with functionality.
          </p>
          <div className={styles.scrollIndicator}>
            <div className={styles.scrollDot}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
