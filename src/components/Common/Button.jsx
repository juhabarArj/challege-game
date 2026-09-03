export default function Button({
  children,
  variant = 'default',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  let baseClass = 'neo-button';
  
  switch (variant) {
    case 'primary':
      baseClass = 'neo-button-primary';
      break;
    case 'secondary':
      baseClass = 'neo-button-secondary';
      break;
    case 'danger':
      baseClass = 'neo-button-danger';
      break;
    default:
      baseClass = 'neo-button';
  }

  let sizeClass = 'px-6 py-3';
  switch (size) {
    case 'sm':
      sizeClass = 'px-4 py-2 text-sm';
      break;
    case 'lg':
      sizeClass = 'px-8 py-4 text-lg';
      break;
    default:
      sizeClass = 'px-6 py-3';
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClass} ${sizeClass} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin-neo mr-2"></span>
          Cargando...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
