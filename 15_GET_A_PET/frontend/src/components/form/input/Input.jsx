import inputStyle from './Input.module.css'

const Input = ({ type, text, name, placeholder, handleOnChange, value, multiple }) => {
    return (
        <div className={inputStyle.form_control}>
            <label htmlFor={name}>
                {text}:
            </label>
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                value={value}
                onChange={handleOnChange}
                {...multiple ? { multiple } : ''} />
        </div>
    )
}

export default Input