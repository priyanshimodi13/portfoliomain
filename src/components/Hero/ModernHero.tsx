import React from 'react';
import { motion } from 'framer-motion';
import LineWaves from '../LineWaves/LineWaves';
import styles from './Hero.module.css';

const ModernHero = () => {
  return (
    <div className={styles.heroWrapper}>
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
            <img src="https://framerusercontent.com/images/vBe56549gs4eoEzOSmyUR33ZTjI.png" alt="Priyanshi Modi" />
          </div>
          <span className={styles.dot}></span>
          <span className={styles.badgeText}>Available for work</span>
        </motion.div>

        <div className={styles.titleWrapper}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className={styles.titleLine}>Priyanshi</h1>
            <h1 className={styles.titleLine}>Modi</h1>
          </motion.div>
          
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Digital Developer & Designer
          </motion.p>
        </div>

        <div className={styles.bottomRow}>
          <motion.p 
            className={styles.bioFragment}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Crafting high-performance digital experiences that merge technical precision with creative vision.
          </motion.p>
          
          <div className={styles.scrollIndicator}>
            <div className={styles.scrollDot}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernHero;
