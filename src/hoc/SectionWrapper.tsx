import Scroll from "@/components/Scroll/Scroll";
import { staggerContainer } from "@/utils/motion";
import { motion, useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export interface SectionConfig {
  id: string;
  title: string;
}

const sectionConfigs: SectionConfig[] = [
  { id: "hero", title: "Home" },
  { id: "work", title: "Experience" },
  { id: "contact", title: "Contact" }
];

interface SectionWrapperProps {
  showScroll?: boolean;
  showUpScroll?: boolean;
  showDownScroll?: boolean;
  scrollUpTitle?: string;
  scrollDownTitle?: string;
}

const SectionWrapper = <P extends Record<string, unknown>>(
  Component: React.ComponentType<P>,
  idName: string,
  options: SectionWrapperProps = {}
) => {
  const {
    showScroll = false, 
    showUpScroll = true,
    showDownScroll = true,
    scrollUpTitle = "Scroll up",
    scrollDownTitle = "Scroll down"
  } = options;

  return function HOC(props: P) {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { amount: 0.3 }); 
    const [shouldShowScroll, setShouldShowScroll] = useState(false);
    const [prevSection, setPrevSection] = useState<SectionConfig | null>(null);
    const [nextSection, setNextSection] = useState<SectionConfig | null>(null);
    
    useEffect(() => {
      const currentIndex = sectionConfigs.findIndex(section => section.id === idName);
      
      if (currentIndex > 0) {
        setPrevSection(sectionConfigs[currentIndex - 1]);
      } else {
        setPrevSection(null);
      }
      
      if (currentIndex < sectionConfigs.length - 1) {
        setNextSection(sectionConfigs[currentIndex + 1]);
      } else {
        setNextSection(null);
      }
    }, []);

    useEffect(() => {
      if (isInView) {
        setShouldShowScroll(true);
      } else {
        setShouldShowScroll(false);
      }
    }, [isInView]);

    return (
      <motion.section
        ref={sectionRef}
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="container mx-auto position-relative py-1 min-vh-100 d-flex flex-column justify-content-center"
      >
        <span className="d-block" id={idName}>
          &nbsp;
        </span>

        {/* Only render scroll indicators if explicitly enabled */}
        {showScroll && shouldShowScroll && prevSection && showUpScroll && (
          <Scroll 
            targetId={prevSection.id} 
            title={scrollUpTitle} 
            direction="up"
            className="fade-in"
          />
        )}

        <Component {...props} />

        {showScroll && shouldShowScroll && nextSection && showDownScroll && (
          <Scroll 
            targetId={nextSection.id} 
            title={scrollDownTitle} 
            direction="down"
            className="fade-in"
          />
        )}
      </motion.section>
    );
  };
};

export default SectionWrapper;