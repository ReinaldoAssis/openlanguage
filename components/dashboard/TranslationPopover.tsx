import { Popover } from "@nextui-org/react";
import { useState } from "react";
import styles from "../../styles/Dashboard.module.css";

export default function TranslationPopover({
  i,
  word,
}: {
  i: number;
  word: string;
}): JSX.Element {
  const [translation, setTranslation] = useState("null");

  async function Get_translation(word: string, base: string, target: string) {
    if (translation != "null") return translation;

    let tr: string = (
      await (
        await fetch(
          `https://openlanguage.deta.dev/translate?text=${word}&base=${base}&target=${target}`
        )
      ).json()
    ).value;

    setTranslation(tr);
    return tr;
  }

  return (
    <Popover
      key={`${i}popover_targetword`}
      placement="top"
      disableAnimation
      onOpenChange={async () => await Get_translation(word, "fr", "en")}
    >
      <Popover.Trigger>
        <h3
          key={`${i}targetword`}
          style={{ marginLeft: i != 0 ? 5 : 0 }}
          className={styles.targetword}
        >
          {word}
        </h3>
      </Popover.Trigger>
      <Popover.Content>
        <h4 style={{ color: "black" }}>{translation}</h4>
      </Popover.Content>
    </Popover>
  );
}
