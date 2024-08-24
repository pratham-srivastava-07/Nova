
export default function PrimaryButton({children, onClick}: {children: string, onClick: () => void}) {
    return <div onClick={onClick} className="text-md rounded-md p-3 border border-black cursor-pointer">
        {children}
    </div>
}