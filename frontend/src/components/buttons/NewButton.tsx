export default function NewButton({children, onClick}: {children: any, onClick: () => void}) {
    return <div onClick={onClick} className="p-3 flex items-center cursor-pointer rounded-md text-md bg-black text-white">
        {children}
    </div>
}