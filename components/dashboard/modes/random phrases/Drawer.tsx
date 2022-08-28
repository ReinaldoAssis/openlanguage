import styles from "../../../../styles/Drawer.module.css";
import mobileStyles from "../../../../styles/mobile/Drawer.module.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ExternalLink, PlayCard } from "tabler-icons-react";
import { Button, Tooltip } from "@nextui-org/react";

type Definition = {
  def: string;
  example: string | Array<string>;
};

interface Dictionary<T> {
  [Key: string]: T;
}

export default function Drawer({
  visible,
  width,
  height,
  definitions = {},
  word,
}: {
  visible: boolean;
  width: number;
  height: number;
  definitions?: Dictionary<Array<Definition>>;
  word: string;
}) {
  return width <= 700 ? (
    <Mobile
      word={word}
      visible={visible}
      height={height}
      definitions={definitions}
    />
  ) : (
    <Desktop visible={visible} />
  );
}

//#region Mobile

function Mobile({
  visible,
  height,
  definitions: defClasses,
  word,
}: {
  visible: boolean;
  height: number;
  definitions: Dictionary<Array<Definition>>;
  word: string;
}) {
  const [posY, setposY] = useState(-height);
  // let keys : Array<string> = [];

  useEffect(() => {
    setposY(visible ? 0 : -height);
    // setposY(0);
  }, [visible]);

  useEffect(() => {
    // setposY(500);
    // setposY(0);
  }, []);

  function clean(w: string) {
    let ar = [".", ",", "!", "...", "?"];
    for (let x of ar) w = w.replace(x, "");
    return w;
  }

  return (
    <>
      <motion.div
        // initial={{ y: -100 }}
        drag="y"
        dragConstraints={{
          top: height - 0.99 * height,
          bottom: height - 400,
        }}
        animate={{
          bottom: posY,
          transition: { ease: [0.3, 1.14, 1, 0.99], duration: 0.8 },
        }}
        style={{ borderBottomLeftRadius: 0, borderTopRightRadius: 15 }}
        className={mobileStyles.drawer}
      >
        <div className={mobileStyles.drawerHeader}>
          <h2>{clean(word)}</h2>
          <h4>wɜːd</h4>
        </div>

        <div className={mobileStyles.drawerBody}>
          {Object.keys(defClasses).map((item, i) => {
            return (
              <div className={mobileStyles.drawerDef}>
                <h4>
                  {i + 1}. {item}{" "}
                </h4>
                <p style={{ textAlign: "justify" }}>
                  &emsp;{(Object.values(defClasses).at(i) ?? [])[0].def}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}

//#endregion

//#region Desktop
/** render drawer for desktop screens */
function Desktop({ visible }: { visible: boolean }) {
  const [posx, setPosx] = useState(500);

  useEffect(() => {
    setPosx(visible ? 0 : 500);
    // setPosx(0);
  }, [visible]);

  useEffect(() => {
    // setPosx(500);
    // setPosx(0);
  }, []);

  return (
    <>
      <motion.div
        initial={{ x: 500 }}
        animate={{
          x: posx,
          transition: { ease: "anticipate", duration: 0.6 },
        }}
        className={styles.drawer}
      >
        <div className={styles.drawerHeader}>
          <h2>Word</h2>
          <h4>wɜːd</h4>
          <div className={styles.drawerIcondiv}>
            <Tooltip
              content={"Add to deck"}
              color={"primary"}
              placement={"left"}
              hideArrow
              style={{ marginLeft: 8 }}
            >
              <PlayCard style={{ marginTop: 20 }} />
            </Tooltip>
            <Tooltip
              content={"See in wiktionary"}
              color={"primary"}
              placement={"left"}
              hideArrow
              style={{ marginLeft: 9 }}
            >
              <ExternalLink style={{ marginTop: 5 }} />
            </Tooltip>
          </div>
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
//#endregion
