import { Button, Popover } from "@nextui-org/react";
import { useEffect, useState } from "react";
import RandPhrase from "../components/dashboard/modes/RandPhrase";
import { Navbar } from "../components/dashboard/Navbar";
import TranslationPopover from "../components/dashboard/TranslationPopover";

export default function Dashboard() {
  return (
    <>
      <RandPhrase />
    </>
  );
}

// export default function Dashboard() {
//   const [phrase, setPhrase] = useState("Hi mom hi dad");

//   const [translations, setTranslations] = useState(Array<string>);

//   //base: base language
//   //target: to be translated language (or target language of translation)
//   async function Get_translations(base: string, target: string) {
//     if (translations.length > 0) return translations;

//     let _translations : Array<string> = [];

//     phrase.split(' ').forEach(async (word) => {
//       let tr: string = (
//         await (
//           await fetch(
//             `https://openlanguage.deta.dev/translate?text=${word}&base=${base}&target=${target}`
//           )
//         ).json()
//       ).value;

//       console.log(`tr atual ${tr}`);

//       _translations.concat(tr);

//     })

//     setTranslations(_translations);
//     return _translations;
//   }

//   return (
//     <>
//       <main className={styles.main}>

//         <h3>{Generate_text(phrase, translations)}</h3>
//         <Button
//           css={{
//             boxShadow: "0px 2px 15px #0072f5",
//             marginTop: 40,
//             padding: "0 40px",
//           }}
//           auto
//           onClick={async () => {
//             setPhrase((await fetch_phrase()).target ?? "error");
//             Get_translations("fr","en");
//           }}
//         >
//           New
//         </Button>
//         <Navbar />
//       </main>
//     </>
//   );
// }

// interface fetchData {
//   target?: string;
//   base?: string;
// }

// async function fetch_phrase(): Promise<fetchData> {
//   let resp: any = await (await fetch("/api/get_phrase")).json();
//   return { target: resp.sentence.text };
// }

// function Generate_text(target: string, translations:Array<string>): JSX.Element {
//   let list: Array<string> = target.split(" ");

//   return (
//     <div style={{ display: "flex" }}>
//       {list.map((word, i) => (
//         <TranslationPopover translation={translations[i]} key={`custompopover-${i}`} i={i} word={word} />
//       ))}
//     </div>
//   );
// }
