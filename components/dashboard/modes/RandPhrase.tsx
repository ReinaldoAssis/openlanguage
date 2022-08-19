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

async function fetch_phrase(): Promise<fetchData> {
  let resp: any = await (await fetch("/api/get_phrase")).json();
  return { target: resp.sentence.text };
}

async function fetch_word_translation(
  word: string,
  base: string,
  target: string
): Promise<string> {
  let tr: string = (
    await (
      await fetch(
        `https://openlanguage.deta.dev/translate?text=${word}&base=${base}&target=${target}`
      )
    ).json()
  ).value;
  return tr;
}

async function fetch_all_translations(
  text: string,
  base: string,
  target: string
): Promise<Array<string>> {
  let arr: Array<string> = [];
  let spl = text.split(" ");
  spl.forEach(async (word) => {
    arr.push(await fetch_word_translation(word, base, target));
    console.log(arr[arr.length - 1]);
  });
  return arr;
}

export default function RandPhrase() {
  const [frase, setFrase] = useState("Hi mom hi dad");
  //const [translation, setTranslation] = useState(Array<string>);
  const [width, setWidth] = useState(600);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
    }
  }, []);

  useEffect(() => {
    fetch_phrase().then(async (x) => {
      setFrase("" + x.target);

      //https://fr.wiktionary.org/w/api.php?action=parse&page=dehors&section=1&prop=wikitext&format=json
    });
    //fetch_all_translations(frase,"fr","en"); //TODO: change hardcoded languages
  }, []);

  const refresh = () => {
    // console.log("refreshing...");
    fetch_phrase().then((x) => setFrase("" + x.target));
    //fetch_all_translations(frase,"fr","en");
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

  //console.log(brokenLines);

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
  const [translation, setTranslation] = useState("Loading...");

  useEffect(() => {
    setTranslation("Loading...");
  }, []);

  const show = async () => {
    setShowTranslation(true);
    if (translation == "Loading...") {
      //TODO: change hard coded language
      let wikitext = await (
        await fetch(
          `/api/get_def?base=${"fr"}&word=${encodeURI(clean_word(word))}`
        )
      ).json();
      console.log(
        `link: /api/get_def?base=${"fr"}&word=${encodeURI(clean_word(word))}`
      );
      // console.log(wikitext.value[0].def);
      // console.log(wikitext);
      setTranslation(wikitext.value[0].def);
    }
  };
  const hide = () => setShowTranslation(false);

  //   useEffect(() => {
  //     let mock = (Math.random() + 1).toString(36).substring(7);

  //     setTranslation(mock);
  //   }, []);

  return (
    <>
      {showTranslation ? (
        <div className={styles.translationword_container}>
          <h3 className={styles.translationword}>{translation}</h3>
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
