import React, { forwardRef } from 'react';
import { SplineSceneBasic } from "../Hero/SplineHero";

const HeroSection = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} id="home" className="section hero-snap">
      <SplineSceneBasic />
    </section>
  );
});

export default HeroSection;
