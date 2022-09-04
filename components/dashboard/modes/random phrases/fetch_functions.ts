export type Definition = {
  def: string;
  example: string | Array<string>;
  pronunciation?: string;
};

export interface Dictionary<T> {
  [Key: string]: T;
}

/**Fetch word definitions
 * @returns keys as classes and each class as an object containing an array of definitions
 */
export async function get_definition(
  word: string,
  currentDefinition?: string
): Promise<Dictionary<Array<Definition>>> {
  //   if (currentDefinition == "Loading...") {
  //TODO: change hard coded language
  let wikitext: Dictionary<Array<Definition>> = await (
    await fetch(`/api/get_def?base=${"fr"}&word=${encodeURI(clean_word(word))}`)
  ).json();

  return wikitext;
  //   }

  //   return { def: "null!", example: [] };
}

export function clean_word(word: string): string {
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

export function randKey(seed?: number): string {
  return (Math.random() * (seed ?? 1) + 1).toString(36).substring(7);
}
