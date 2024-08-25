export default function NormalButton({children, onClick}: {children:  string, onClick: () => void}) {
    return <div className="p-2 border border-gray-200 cursor-pointer" onClick={onClick}>
        {children}
    </div>
}