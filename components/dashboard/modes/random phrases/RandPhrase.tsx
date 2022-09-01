import { Button } from "@nextui-org/react";
import Image from "next/image";
import parse from "node-html-parser";
import { useEffect, useState } from "react";
import styles from "../../../../styles/Dashboard.module.css";
import Drawer from "./Drawer";
import { Definition, Dictionary, get_definition } from "./fetch_functions";
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
  const [height, setHeight] = useState(850);
  const [drawer, setDrawer] = useState(false);

  const [word, setWord] = useState("");
  const [def, setDef] = useState({});

  //called when window is resized
  const updateDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
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

  useEffect(() => {
    setDrawer(true);
    const _fetch = async () => {
      let obj: Dictionary<Definition[]> = await get_definition(word);
      setDef(obj.value);
    };

    _fetch()
      .then(() => {
        //console.log("heres the def");
        Object.keys(def).forEach((x) => {
          console.log(x);
        });
      })
      .catch((e) => {
        console.log("Error fetching definitions");
        console.log(e);
      });
  }, [word]);

  //button action, gets a new random phrase
  const refresh = () => {
    fetch_phrase().then((x) => setFrase("" + x.target));
  };

  function showDrawer(_word: string) {
    setWord(_word);
    setDrawer(!drawer);
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
        <Drawer
          visible={drawer}
          width={width}
          height={height}
          word={word}
          definitions={def}
        />
      </main>
    </>
  );
}

/**button responsible for triggering fetching of new phrases
 * @param onClick - function to be called when button is clicked
 */
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
