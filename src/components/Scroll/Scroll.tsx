import { motion } from "framer-motion";
import PropTypes from "prop-types";
import styles from "./Scroll.module.scss";

export type ScrollDirection = "up" | "down";

interface ScrollProps {
  targetId?: string;
  title?: string;
  direction?: ScrollDirection;
  className?: string;
}

const Scroll = ({ 
  targetId = "about", 
  title = "Navigate to section", 
  direction = "down",
  className = ""
}: ScrollProps) => {
  const route = `#${targetId}`;
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const breatheAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop" as const
    }
  };
  
  return (
    <div className={`${styles.scrollIndicator} ${className} ${direction === "up" ? styles.scrollUp : styles.scrollDown}`}>
      <a 
        href={route} 
        title={title} 
        aria-label={title}
        onClick={handleClick}
        className="d-block text-decoration-none"
      >
        <motion.div 
          className={`${styles.arrowContainer} d-flex justify-content-center align-items-center`}
          animate={breatheAnimation}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {direction === "down" ? (
            <svg width="16" height="16" viewBox="0 0 24 24" className={styles.arrow}>
              <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" className={styles.arrow}>
              <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" />
            </svg>
          )}
        </motion.div>
      </a>
    </div>
  );
};

Scroll.propTypes = {
  targetId: PropTypes.string,
  title: PropTypes.string,
  direction: PropTypes.oneOf(["up", "down"]),
  className: PropTypes.string
};

export default Scroll;