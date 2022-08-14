import { Button, Popover } from "@nextui-org/react";
import { useState } from "react";
import { Navbar } from "../components/dashboard/Navbar";
import styles from "../styles/Dashboard.module.css";

export default function Dashboard() {
  const [phrase, setPhrase] = useState("Hi mom hi dad");

  return (
    <>
      <main className={styles.main}>
        <h3>{Generate_text(phrase)}</h3>
        <Button
          css={{
            boxShadow: "0px 2px 15px #0072f5",
            marginTop: 40,
            padding: "0 40px",
          }}
          auto
          onClick={async () => {
            setPhrase((await fetch_phrase()).target ?? "error");
          }}
        >
          New
        </Button>
        <Navbar />
      </main>
    </>
  );
}

interface fetchData {
  target?: string;
  base?: string;
}

async function fetch_phrase(): Promise<fetchData> {
  let resp: any = await (await fetch("/api/get_phrase")).json();
  return { target: resp.sentence.text };
}

function Generate_text(target: string): JSX.Element {
  let list: Array<string> = target.split(" ");

  const [translation, setTranslation] = useState("null");

  async function Get_translation(word: string, base: string, target: string) {
    if (translation != "null") return translation;

    //`https://openlanguage.deta.dev/translate?text=hi&base=en&target=fr`
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
    <div style={{ display: "flex" }}>
      {list.map((word, i) => (
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
      ))}
    </div>
  );
}
