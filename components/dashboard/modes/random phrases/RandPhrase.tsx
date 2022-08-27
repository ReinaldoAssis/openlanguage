import { Button } from "@nextui-org/react";
import Image from "next/image";
import parse from "node-html-parser";
import { useEffect, useState } from "react";
import styles from "../../../../styles/Dashboard.module.css";
import Drawer from "./Drawer";
import TextSplitter from "./TextSplitter";

//random phrase mode

interface fetchData {
  target?: string;
  base?: string;
}

async function fetch_phrase(): Promise<fetchData> {
  let resp: any = await (await fetch("/api/get_phrase")).json();
  return { target: resp.sentence.text };
}

export default function RandPhrase() {
  const [frase, setFrase] = useState("Hi mom hi dad");
  const [width, setWidth] = useState(600);
  const [drawer, setDrawer] = useState(false);

  //called when window is resized
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  //gets the window size and the risize event
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
    }
  }, []);

  //fetch uma frase aleatoria
  useEffect(() => {
    //TEMP
    // fetch_phrase().then(async (x) => {
    //   setFrase("" + x.target);
    // });
    setFrase(
      "La pire chose que l'on puisse faire est de ne faire quelque chose qu'à moitié sérieusement."
    );
  }, []);

  //button action, gets a new random phrase
  const refresh = () => {
    fetch_phrase().then((x) => setFrase("" + x.target));
  };

  function showDrawer() {
    setDrawer(!drawer);
    console.log("changed to " + (drawer ? "visible" : "hidden"));
  }

  return (
    <>
      <main
        className={styles.main}
        onClick={(e) => {
          e.stopPropagation();
          if (drawer) setDrawer(false);
        }}
      >
        <div className={styles.phrasedisplay}>
          <TextSplitter width={width} text={frase} displayDrawer={showDrawer} />
          <RefreshButton onClick={refresh} />
        </div>
        <Drawer visible={drawer} />
      </main>
    </>
  );
}

function RefreshButton({ onClick }: { onClick: Function }) {
  return (
    <>
      <div
        onClick={() => onClick()}
        style={{ height: 30, width: 30, marginLeft: 20 }}
      >
        <Image src="/dashboard/refresh.svg" height="100%" width="100%" />
      </div>
    </>
  );
}
