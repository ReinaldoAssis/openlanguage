import { Button } from "@nextui-org/react";
import Image from "next/image";
import parse from "node-html-parser";
import { useEffect, useState } from "react";
import styles from "../../../styles/Dashboard.module.css";

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
  //const [translation, setTranslation] = useState(Array<string>);
  const [width, setWidth] = useState(600);

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

  return (
    <>
      <main className={styles.main}>
        <div className={styles.phrasedisplay}>
          <TextSplitter width={width} text={frase} />
          <RefreshButton onClick={refresh} />
        </div>
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

function TextSplitter({ text, width }: { text: string; width: number }) {
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
            <WordElement key={randKey()} word={word} i={i} />
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

    let parsedObj = {};
    // Object.values(wikitext.value).forEach((v, i) => {
    //   console.log(Object.keys(wikitext.value)[i]);
    //   console.log(v);
    // });

    // console.log(Object.values(wikitext.value)[0][0].def);
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
    .replaceAll("-Tu", "")
    .replaceAll("-Vous", "");

  return word;
}

function WordElement({ word, i }: { word: string; i: number }) {
  const [showTranslation, setShowTranslation] = useState(false);
  const [definition, setDefinition] = useState("Loading...");

  useEffect(() => {
    setDefinition("Loading...");
  }, []);

  const show = async () => {
    setShowTranslation(true);
    setDefinition(await get_definition(definition, word));
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
        onMouseEnter={show}
        onMouseLeave={hide}
      >
        {word}
      </h3>
    </>
  );
}
