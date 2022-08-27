import styles from "../../../../styles/Dashboard.module.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Drawer({ visible }: { visible: boolean }) {
  const [posx, setPosx] = useState(500);

  useEffect(() => {
    setPosx(visible ? 0 : 500);
  }, [visible]);

  useEffect(() => {
    setPosx(500);
  }, []);

  return (
    <>
      <motion.div
        initial={{ x: 500 }}
        animate={{
          x: posx,
          transition: { ease: "easeIn", duration: 0.2 },
        }}
        className={styles.drawer}
        onBlur={() => console.log("out")}
      >
        <div className={styles.drawerHeader}>
          <h2>Word</h2>
          <h4>wɜːd</h4>
        </div>

        <div className={styles.drawerBody}>
          <div className={styles.drawerDef}>
            <h4>1. Nom commun </h4>
            <p style={{ textAlign: "justify" }}>
              &emsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}
