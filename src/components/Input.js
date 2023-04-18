function Input({type, value, onChange, required}) {
    return (
        <input type={type} required={required} value={value} onChange={onChange} className='border w-80 px-3 py-1 rounded'/>
    )
};

export default Input;