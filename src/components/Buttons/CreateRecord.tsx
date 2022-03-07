import { PlusCircle } from '@/assets/icons/Misc'

type Props = {
    onClick: () => void
}

const CreateRecord = ({ onClick }: Props) => {
    return (
        <button onClick={onClick}>
            <PlusCircle width={26} fill="white" />
            Create record
        </button>
    )
}

export default CreateRecord
