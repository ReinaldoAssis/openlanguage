import { Button, Popover } from "@nextui-org/react";
import { useState } from "react";
import { Navbar } from "../components/dashboard/Navbar";
import TranslationPopover from "../components/dashboard/TranslationPopover";
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

  return (
    <div style={{ display: "flex" }}>
      {list.map((word, i) => (
        <TranslationPopover i={i} word={word} />
      ))}
    </div>
  );
}
