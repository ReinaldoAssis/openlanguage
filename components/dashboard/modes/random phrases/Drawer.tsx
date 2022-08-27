import styles from "../../../../styles/Dashboard.module.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Drawer({ visible }: { visible: boolean }) {
  const [posx, setPosx] = useState(500);

  useEffect(() => {
    setPosx(visible ? 0 : 500);
  }, [visible]);

  return (
    <>
      <motion.div
        animate={{ x: posx, transition: { ease: "easeIn", duration: 0.2 } }}
        className={styles.drawer}
      ></motion.div>
    </>
  );
}
