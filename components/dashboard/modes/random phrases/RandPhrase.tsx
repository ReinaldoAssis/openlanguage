import { Button } from "@nextui-org/react";
import Image from "next/image";
import parse from "node-html-parser";
import { useEffect, useState } from "react";
import styles from "../../../../styles/Dashboard.module.css";
import Drawer from "./Drawer";

//random phrase mode

interface fetchData {
  target?: string;
  base?: string;
}

interface WikiTextDefinition {
  def: string;
  example: string[];
}

interface WikiTextWordClass {
  [wordClass: string]: WikiTextDefinition;
}

interface WikiText {
  value: WikiTextWordClass[];
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

/**Component responsible for displaying individual words */
function TextSplitter({
  text,
  width,
  displayDrawer,
}: {
  text: string;
  width: number;
  displayDrawer?: Function;
}) {
  const spl = text.split(" ");

  let brokenLines: Array<Array<string>> = [];

  while (spl.length > 0) {
    brokenLines.push(spl.splice(0, Math.ceil(width / 100)));
  }

  function randKey(seed?: number): string {
    return (Math.random() * (seed ?? 1) + 1).toString(36).substring(7);
  }

  return (
    <div className={styles.brokencontainer}>
      {brokenLines.map((line, j) => (
        <div key={randKey()} className={styles.brokenline}>
          {line.map((word, i) => (
            <WordElement
              displayDrawer={displayDrawer}
              key={randKey()}
              word={word}
              i={i}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

async function get_definition(
  currentDefinition: string,
  word: string
): Promise<string> {
  if (currentDefinition == "Loading...") {
    //TODO: change hard coded language
    let wikitext: WikiText = await (
      await fetch(
        `/api/get_def?base=${"fr"}&word=${encodeURI(clean_word(word))}`
      )
    ).json();

    return Object.values(wikitext.value)[0][0].def;
  }

  return "";
}

function clean_word(word: string): string {
  word = word.trim().toLowerCase();
  word = word
    .replaceAll(".", "")
    .replaceAll("?", "")
    .replaceAll("!", "")
    .replaceAll(",", "")
    .replaceAll(";", "")
    .replaceAll("l'", "")
    .replaceAll("L'", "")
    .replaceAll("d'", "")
    .replaceAll("D'", "")
    .replaceAll("-tu", "")
    .replaceAll("-vous", "")
    .replaceAll("qu'", "")
    .replaceAll("-toi", "")
    .replaceAll("-ci", "")
    .replaceAll("-cela", "")
    .replaceAll("j'", "");

  return word;
}

function WordElement({
  word,
  i,
  displayDrawer,
}: {
  word: string;
  i: number;
  displayDrawer?: Function;
}) {
  const [showTranslation, setShowTranslation] = useState(false);
  const [definition, setDefinition] = useState("Loading...");

  useEffect(() => {
    setDefinition("Loading...");
  }, []);

  const show = async () => {
    setShowTranslation(true);
    if (definition == "Loading...") {
      let def: string = await get_definition(definition, word);
      let end: number = 0;

      //Ends the content in the end of a complete word (that is, not broken)
      def.split(" ").map((x) => {
        if (end + x.length <= 50) end += x.length;
      });
      setDefinition(def.length > 50 ? def.substring(0, end) + "..." : def);
    }
  };
  const hide = () => setShowTranslation(false);

  return (
    <>
      {showTranslation ? (
        <div className={styles.translationword_container}>
          <h3 className={styles.translationword}>{definition}</h3>
        </div>
      ) : null}
      <h3
        key={`${i}targetword`}
        style={{ marginLeft: i != 0 ? 6 : 0 }}
        className={styles.targetword}
        onMouseEnter={() => {}} //show
        onMouseLeave={hide}
        onClick={() => {
          displayDrawer?.();
        }}
      >
        {word}
      </h3>
    </>
  );
}
