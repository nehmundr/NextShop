function Button({type, children, onClick=()=>{}}){
    return (
        <button type={type} onClick={onClick}
        className="bg-green-800 text-gray-100 rounded p-2 hover:bg-green-700 my-2">
            {children}
        </button>
    )
};

export default Button