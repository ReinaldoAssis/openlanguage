import styles from "../../../../styles/Drawer.module.css";
import mobileStyles from "../../../../styles/mobile/Drawer.module.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ExternalLink, PlayCard } from "tabler-icons-react";
import { Button, Tooltip } from "@nextui-org/react";
import { clean_word, randKey } from "./fetch_functions";
import { Definition, Dictionary } from "./fetch_functions";

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
  definitions?: Dictionary<Array<Definition>> | undefined;
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
    <Desktop
      visible={visible}
      height={height}
      definitions={definitions}
      word={word}
    />
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
  definitions: Dictionary<Array<Definition>> | undefined;
  word: string;
}) {
  const [posY, setposY] = useState(-height);

  useEffect(() => {
    setposY(visible ? 0 : -height);
    // setposY(0);
  }, [visible]);

  useEffect(() => {
    setposY(-height);
  }, []);

  function mappedDefs(): JSX.Element[] {
    let element: JSX.Element[];
    element = Object.keys(defClasses ?? {}).map((item, i) => {
      return (
        <div className={mobileStyles.drawerDef} key={randKey(2410)}>
          <h4>
            {i + 1}. {item}{" "}
          </h4>
          <p style={{ textAlign: "justify" }}>
            &emsp;{(Object.values(defClasses ?? {}).at(i) ?? [])[0].def}
          </p>
        </div>
      );
    });
    return element;
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
          <h2>{clean_word(word)}</h2>
          <h4>wɜːd</h4>
        </div>

        <div className={mobileStyles.drawerBody}>{mappedDefs()}</div>
      </motion.div>
    </>
  );
}

//#endregion

//#region Desktop
/** render drawer for desktop screens */
function Desktop({
  visible,
  height,
  definitions: defClasses,
  word,
}: {
  visible: boolean;
  height: number;
  definitions: Dictionary<Array<Definition>> | undefined;
  word: string;
}) {
  const [posx, setPosx] = useState(500);

  useEffect(() => {
    setPosx(visible ? 0 : 500);
    // setPosx(0);
  }, [visible]);

  useEffect(() => {
    // setPosx(500);
  }, []);

  function mappedDefs(): JSX.Element[] {
    try {
      let element: JSX.Element[];
      element = Object.keys(defClasses ?? {}).map((item, i) => {
        return (
          <div className={mobileStyles.drawerDef} key={randKey(2410)}>
            <h4>
              {i + 1}. {item}{" "}
            </h4>
            <p style={{ textAlign: "justify" }}>
              &emsp;{(Object.values(defClasses ?? {}).at(i) ?? [])[0].def}
            </p>
          </div>
        );
      });
      return element;
    } catch {
      visible = false;

      console.log("An error occured while mapping definitions");
      return [];
    }
  }

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
          <h2>{clean_word(word)}</h2>
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

        <div className={styles.drawerBody}>{mappedDefs()}</div>
      </motion.div>
    </>
  );
}
//#endregion
