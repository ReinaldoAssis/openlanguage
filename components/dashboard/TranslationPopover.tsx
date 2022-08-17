import { Popover } from "@nextui-org/react";
import { useEffect, useState } from "react";
import styles from "../../styles/Dashboard.module.css";

export default function TranslationPopover({
  i,
  word,
  translation,
}: {
  i: number;
  word: string;
  translation: string;
}): JSX.Element {
  useEffect(() => {
    translation = translation;
  }, [translation]);

  return (
    <Popover
      key={`${i}popover_targetword`}
      placement="top"
      disableAnimation
      //   onOpenChange={async () => await Get_translation(word, "fr", "en")}
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
