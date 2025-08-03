import { Form } from "react-bootstrap"
import { SUPPORTED_LANGUAGES } from "../constants"
import { type FC } from "react"
import type {Language, Sectiontype } from "../type.ts"

interface Props {
    type: Sectiontype,
    onChange: (value:string) => void,
    value: string
}
export const LanguageSelector: FC<Props> = ({ onChange, type, value }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value as Language)
    }

    return(
        <Form.Select aria-label="Selecciona el idioma" onChange={handleChange} value={value}>
            {type === 'from' && <option value='auto'>Detectar Idioma</option>}
            {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => {
                return (
                    <option key={key} value={key}>{literal}</option>
                )})

            }
        </Form.Select>
    )
}