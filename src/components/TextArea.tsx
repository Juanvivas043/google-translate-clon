import { Form } from "react-bootstrap"
import { SectionType } from "../type.ts"

interface Props {
    type: SectionType,
    loading?: boolean,
    onChange: (value:string)=>void,
    value:string
}

const commonStyles = { border: 0,  height: '200px'}

export const TextArea = ({ type, loading, value, onChange }: Props) => {
    const styles = type === SectionType.From ?
    commonStyles :
    {...commonStyles, backgroundColor: '#f5f5f5'}

    const getPlaceHolder = ({ type, loading }: {type: SectionType, loading?: boolean}) => {
        if (type === SectionType.From) return 'Introducir Texto'
        if (loading === true) return 'Cargando'
        return 'Traduccion'
    }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value)
    }

    return (
        <Form.Control
        as='textarea'
        autoFocus={type === SectionType.From}
        disabled={type === SectionType.To}
        placeholder={getPlaceHolder({type, loading})}
        style={styles}
        value={value}
        onChange={handleChange}/>
    )
}