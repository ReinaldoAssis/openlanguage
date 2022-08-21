// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { HTMLElement, NodeType, parse } from "node-html-parser";

type Data = {
  value: any;
  class?: string;
};

type Definition = {
  def: string;
  example: string | Array<string>;
};

interface Dictionary<T> {
  [Key: string]: T;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const debug = true;
  let args = req.query;
  //convertendo valores URI para strings
  if (args.base != "") args.base = decodeURI(args.base?.toString() ?? "");
  if (args.word != "") args.word = decodeURI(args.word?.toString() ?? "");

  if (debug) console.log(`Definition request ${args.word} lang=${args.base}`);

  let html = await (
    await fetch(
      `http://${args.base ?? "fr"}.wiktionary.org/wiki/${args.word ?? "null"}`
    )
  ).text();
  let root = parse(html);

  //pega uma lista de possíveis classes para uma mesma palavra
  // let wordClasses = root.
  //   .filter((x) => x.localName == "b" && x.text == args.word);

  //limpa as tabelas do codigo fonte
  root.querySelectorAll("table").forEach((t) => t.remove());

  //pega a posição (se houver) da primeira sectionlanguage que NÃO seja FR TODO: remove hardcoded language
  let position = "";
  try {
    position = parse(
      root.innerHTML.substring(
        root.innerHTML.indexOf(root.querySelector("#fr")?.toString() ?? "")
      )
    )
      .querySelectorAll(".sectionlangue")
      .filter((x) => x.id != "fr")[0].innerHTML;
  } catch {
    position = "null";
  }

  if (debug) console.log(`Position: ${position}`);

  let aux_html = root.querySelector(".mw-parser-output")?.innerHTML ?? "";

  //this treats the aux_html as to ignore all other languages other than the base language
  //if there aren't other languages in the page, position = "null" and so it splits directly from
  //the aux_html
  let maininfo =
    position != "null"
      ? aux_html.substring(0, aux_html.indexOf(position)).split("</ol>") ?? []
      : aux_html.split("</ol>") ?? [];

  if (debug) console.log(`Main info ${maininfo.length}`);

  let definitionsMor: Dictionary<Array<Definition>> = {};

  for (let i = 0; i < maininfo.length; i++) {
    maininfo[i] += "</ol>";
    let section = parse(maininfo[i]);

    //how many <b>{word}</b> elements there are in the section, determines if the section is about what
    //we want
    let flag = section
      .querySelectorAll("b")
      .filter((x) => x.text.includes(args.word + ""));

    if (debug) {
      console.log("------Section---------");
      console.log(section.toString());
      console.log("---------------");

      console.log(`Flag ${flag.length}`);
    }

    if (flag.length > 0) {
      //a parte principal do html onde se encontram as possíveis definições
      //e seus exemplos em frases
      let definicoesMor = section.querySelector("ol");

      //uma lista que contem as possíveis definições e suas frases
      //filtra para coletar todos os <li> que não tenham parente <ul>
      //aqueles com parentes <ul> são exemplos de frases
      let exampleElementList =
        definicoesMor
          ?.querySelectorAll("li")
          .filter((x) => x.parentNode.localName != "ul") ?? [];

      if (debug)
        console.log(`Example element list ${exampleElementList.length}`);

      //lista de definições a ser retonada pela API
      let definitions: Array<Definition> = [];

      //caso a lista não for vazia
      if (exampleElementList.length > 0) {
        exampleElementList.map((x) => {
          let exampleContent = x.querySelector("ul");
          let examplePhrase = exampleContent?.querySelectorAll("li");
          let phraseList: Array<string> = [];
          examplePhrase?.forEach((x) => phraseList.push(x.text.trim()));

          let def: Definition = {
            def: x.text.replace(exampleContent?.text ?? "", ""),
            example: phraseList ?? "",
          };
          definitions.push(def);
        });
      }

      definitionsMor[
        section.querySelectorAll(".mw-headline").reverse()[0]?.innerText.trim()
      ] = definitions;
    }
  }

  if (debug) {
    console.log("---------------");
    console.log("Definitions mor");
    console.log(definitionsMor);
    console.log("---------------");
  }

  res.status(200).json({ value: definitionsMor });
}
