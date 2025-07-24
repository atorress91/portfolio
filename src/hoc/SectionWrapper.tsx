import Scroll from "@/components/Scroll/Scroll";
import { staggerContainer } from "@/utils/motion";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import {SectionConfig} from "@/interfaces/SectionConfig.interface";
import {SectionWrapperProps} from "@/interfaces/SectionWrapperProps.interface";
import {sectionConfigs} from "@/constants";

const SectionWrapper = <P extends Record<string, unknown>>(
  Component: React.ComponentType<P>,
  idName: string,
  options: SectionWrapperProps = {}
) => {
  const {
    showScroll = false,
    showUpScroll = true,
    showDownScroll = true,
    useCustomScrollTitles = false,
    scrollUpTitle = "Scroll up",
    scrollDownTitle = "Scroll down",
  } = options;

  return function HOC(props: P) {
    const t = useTranslations("Scroll");
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { amount: 0.3 });
    const [shouldShowScroll, setShouldShowScroll] = useState(false);
    const [prevSection, setPrevSection] = useState<SectionConfig | null>(null);
    const [nextSection, setNextSection] = useState<SectionConfig | null>(null);

    const upScrollText = useCustomScrollTitles ? scrollUpTitle : t("scrollUp");
    const downScrollText = useCustomScrollTitles ? scrollDownTitle : t("scrollDown");

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

        {showScroll && shouldShowScroll && prevSection && showUpScroll && (
          <Scroll
            targetId={prevSection.id}
            title={upScrollText}
            direction="up"
            className="fade-in"
          />
        )}

        <Component {...props} />

        {showScroll && shouldShowScroll && nextSection && showDownScroll && (
          <Scroll
            targetId={nextSection.id}
            title={downScrollText}
            direction="down"
            className="fade-in"
          />
        )}
      </motion.section>
    );
  };
};

export default SectionWrapper;