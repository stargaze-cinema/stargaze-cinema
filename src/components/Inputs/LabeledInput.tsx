import style from './labeledInput.module.scss'

interface Props {
    label?: string
    type?: React.HTMLInputTypeAttribute
    name: string
    value: string | number
    onChange: React.ChangeEventHandler<HTMLInputElement>
    required?: boolean
    min?: string | number
    max?: string | number
    step?: string | number
}

export const LabeledInput: React.FC<Props> = props => {
    return (
        <label className={style.labeledInput}>
            {props.label}
            <input
                type={props.type}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                required={props.required}
                min={props.min}
                max={props.max}
                step={props.step}
            />
        </label>
    )
}

LabeledInput.defaultProps = {
    label: 'Your value',
    type: 'text',
    required: false,
}
