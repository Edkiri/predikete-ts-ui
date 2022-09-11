import './DeleteButton.css';

export interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function DeleteButton({ onClick, disabled = false }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="DeleteButton"
      type="button"
      disabled={disabled}
    >
      Eliminar
    </button>
  );
}
