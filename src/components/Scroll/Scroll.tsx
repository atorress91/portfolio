import { motion } from "framer-motion";
import PropTypes from "prop-types";
import styles from "./Scroll.module.scss";

const Scroll = ({ route = "#about", title = "Lleva al about" }) => {
    return (
        <div className={`position-absolute w-100 d-flex justify-content-center align-items-center ${styles.scrollIndicator}`}>
            <a href={route} title={title}>
                <div className={`rounded-3 ${styles.mouse} d-flex justify-content-center align-items-start p-2 border border-2 ${styles.customBorder}`}>
                    <motion.div
                        animate={{ y: [0, 24, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                        className={styles.mouseDot}
                    />
                </div>
            </a>

        </div>
    );
};

Scroll.propTypes = {
    route: PropTypes.string,
    title: PropTypes.string,
};

export default Scroll;
