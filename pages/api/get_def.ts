// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "node-html-parser";

type Data = {
  value: any;
};

type Definition = {
  value: string;
  example: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let args = req.query;

  let html = await (
    await fetch(
      `http://${args.base ?? "fr"}.wiktionary.org/w/index.php?title=${
        args.word ?? "null"
      }&printable=yes`
    )
  ).text();
  let root = parse(html);

  //a parte principal do html onde se encontram as possíveis definições
  //e seus exemplos em frases
  let definicoesMor = root.querySelector("ol");

  //uma lista que contem as possíveis definições e suas frases
  let exampleElementList = definicoesMor?.querySelectorAll("li") ?? [];

  //lista de definições a ser retonada pela API
  let definitions: Array<Definition> = [];

  //caso a lista não for vazia
  if (exampleElementList.length > 0) {
    exampleElementList.map((x) => {
      let examplePhrase = x.querySelector("ul");
      let def: Definition = {
        value: x.text.replace(examplePhrase?.text ?? "", ""),
        example: examplePhrase?.text ?? "",
      };
      definitions.push(def);
    });
  }

  res.status(200).json({ value: definitions });
}
