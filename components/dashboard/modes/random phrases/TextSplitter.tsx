import { useEffect, useState } from "react";
import styles from "../../../../styles/Dashboard.module.css";

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

/**Component responsible for displaying individual words with hover effect, tooltip display, etc.
 * @param text - takes a string text
 * @param width - screen width
 * @param displayDrawer - function to be called when drawer event happens
 * @returns displays word element array
 */
export default function TextSplitter({
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
