type InputProps = {
  type: string
  id?: string
  value: string
  placeholder: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

const Input = ({type, id, value, placeholder, onChange, onBlur}: InputProps) => {
  return (
    <div className="ui-input">
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
        />
    </div>
  )
}

export default Input
