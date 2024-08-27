
export default function PrimaryButton({children, onClick}: {children: string, onClick: () => void}) {
    return <div onClick={onClick} className="text-md rounded-full px-4 py-2 flex justify-center border border-black cursor-pointer">
        {children}
    </div>
}