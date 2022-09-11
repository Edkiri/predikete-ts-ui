import './SecondaryButton.css';

interface ButtonProps {
  onClick: () => void;
  title: string;
  disabled?: boolean;
}

export function SecondaryButton({
  onClick,
  title,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      className="SecondaryButton"
      onClick={onClick}
      type="button"
      disabled={disabled}
    >
      {title}
    </button>
  );
}
