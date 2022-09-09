import './SecondaryButton.css';

interface ButtonProps {
  onClick: () => void;
  title: string;
}

export function SecondaryButton({ onClick, title }: ButtonProps) {
  return (
    <button type="button" onClick={onClick} className="SecondaryButton">
      {title}
    </button>
  );
}
