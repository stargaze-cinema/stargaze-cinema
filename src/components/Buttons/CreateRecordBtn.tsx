import { PlusCircle } from '@/assets/icons/Misc'

export const CreateRecordBtn: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <button type="button" onClick={onClick}>
            <PlusCircle width={26} fill="white" />
            Create record
        </button>
    )
}
