import { staggerContainer } from "@/utils/motion";
import { motion } from "framer-motion";
import React from "react";

const StarWrapper = <P extends Record<string, unknown>>(
    Component: React.ComponentType<P>,
    idName: string
) => {
    return function HOC(props: P) {
        return (
            <motion.section
                variants={staggerContainer()}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="container mx-auto position-relative py-1 min-vh-100 d-flex flex-column justify-content-center"
            >
        <span className="d-block" id={idName}>
          &nbsp;
        </span>

                <Component {...props} />
            </motion.section>
        );
    };
};

export default StarWrapper;
