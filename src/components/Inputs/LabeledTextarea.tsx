import style from './labeledTextarea.module.scss'

interface Props {
    label?: string
    name: string
    value?: string | number
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>
    required?: boolean
}

export const LabeledTextarea: React.FC<Props> = props => {
    return (
        <label className={style.labeledTextarea}>
            {props.label}
            <textarea name={props.name} value={props.value} onChange={props.onChange}></textarea>
        </label>
    )
}

LabeledTextarea.defaultProps = {
    label: 'Your text',
    required: false,
}
