import './DeleteButton.css';

export interface ButtonProps {
  onClick: () => void;
}

export function DeleteButton({ onClick }: ButtonProps) {
  return (
    <button type="button" onClick={onClick} className="DeleteButton">
      Eliminar
    </button>
  );
}
