// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { HTMLElement, NodeType, parse } from "node-html-parser";

type Data = {
  value: any;
  class: string;
};

type Definition = {
  def: string;
  example: string | Array<string>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let args = req.query;
  //convertendo valores URI para strings
  if (args.base != "") args.base = decodeURI(args.base?.toString() ?? "");
  if (args.word != "") args.word = decodeURI(args.word?.toString() ?? "");

  let html = await (
    await fetch(
      `http://${args.base ?? "fr"}.wiktionary.org/w/index.php?title=${
        args.word ?? "null"
      }&printable=yes`
    )
  ).text();
  let root = parse(html);

  //pega o tipo de classe referente a palavra
  let wordClass = root.querySelectorAll(".mw-headline")[2]?.text ?? "null";
  wordClass = wordClass.trim(); //limpa a string

  //a parte principal do html onde se encontram as possíveis definições
  //e seus exemplos em frases
  let definicoesMor = root.querySelector("ol");

  //uma lista que contem as possíveis definições e suas frases
  //filtra para coletar todos os <li> que não tenham parente <ul>
  //aqueles com parentes <ul> são exemplos de frases
  let exampleElementList =
    definicoesMor
      ?.querySelectorAll("li")
      .filter((x) => x.parentNode.localName != "ul") ?? [];

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

  res.status(200).json({ value: definitions, class: wordClass });
}
