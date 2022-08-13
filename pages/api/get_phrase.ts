// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  value: Response;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let resp = await fetch("https://tatoeba.org/pt-br/sentences/random/fra", {
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
      "sec-ch-ua":
        '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-csrf-token":
        "1d95ebd8be06317189d62d2a1491a57336b5a0df6e0a6edb861e98fb0df9ffc681719605a1edc03c4b52cc683454f2cf1358c06be191884a57d136b2e8b1e326",
      "x-requested-with": "XMLHttpRequest",
      cookie:
        "interface_language=pt-br; csrfToken=1d95ebd8be06317189d62d2a1491a57336b5a0df6e0a6edb861e98fb0df9ffc681719605a1edc03c4b52cc683454f2cf1358c06be191884a57d136b2e8b1e326; CAKEPHP=3j9r7vpagulb58h17rfhnsp5a4; random_lang_selected=fra",
      Referer: "https://tatoeba.org/pt-br/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: null,
    method: "GET",
  });
  console.log(resp.json);
  res.status(200).json(await resp.json());
}
