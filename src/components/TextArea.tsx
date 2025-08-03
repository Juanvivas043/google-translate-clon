import { Form } from "react-bootstrap"
import type { Sectiontype } from "../type.ts"
import { Section } from "../type.ts";

interface Props {
    type: Sectiontype
    loading?: boolean,
    onChange: (value:string)=>void,
    value:string
}

const commonStyles = { border: 0,  height: '200px'}

export const TextArea = ({ type, loading, value, onChange }: Props) => {
    const styles = type === Section.From ?
    commonStyles :
    {...commonStyles, backgroundColor: '#f5f5f5'}

    const getPlaceHolder = ({ type, loading }: {type: Sectiontype, loading?: boolean}) => {
        if (type === Section.From) return 'Introducir Texto'
        if (loading === true) return 'Cargando'
        return 'Traduccion'
    }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value)
    }

    return (
        <Form.Control
        as='textarea'
        autoFocus={type === Section.From}
        disabled={type === Section.To}
        placeholder={getPlaceHolder({type, loading})}
        style={styles}
        value={value}
        onChange={handleChange}/>
    )
}