import {Credentials, Translator} from "@translated/lara"
import { VITE_LARATRANSLATE_API_KEY, VITE_LARATRANSLATE_API_SECRET_KEY } from "./keys";
import { API_SUPPORTED_LANGUAGES } from "../constants"
import type { FromLanguage, Language } from "../type.ts"


const credentials = new Credentials(VITE_LARATRANSLATE_API_KEY, VITE_LARATRANSLATE_API_SECRET_KEY);
const lara = new Translator(credentials);

export async function translate({
    fromLanguage,
    toLanguage,
    text
}: {
    fromLanguage: FromLanguage,
    toLanguage: Language,
    text: string
}) {
    if (fromLanguage === toLanguage) return text
    
    const source = fromLanguage === 'auto' ? null : API_SUPPORTED_LANGUAGES[fromLanguage]
    const target = API_SUPPORTED_LANGUAGES[toLanguage]

     const res = await lara.translate(
        text,
        source,
        target,
        {
        instructions: ['You are an IA that translates text, you receive a text from the use.'],
        style: 'fluid'
        }
    )
    
    return res.translation
}