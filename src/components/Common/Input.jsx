export default function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  ...props
}) {
  return (
    <div className="w-full mb-4">
      {label && (
        <label className="block text-neo-dark font-semibold mb-2 text-sm">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="neo-input"
        {...props}
      />
      {error && (
        <p className="text-neo-accent text-sm mt-1">{error}</p>
      )}
    </div>
  );
}
