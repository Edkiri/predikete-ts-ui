import { FaPlus } from 'react-icons/fa';

import './CreateButton.css';

interface CreateButtonProps {
  onClick: () => void;
}

export function CreateButton({ onClick }: CreateButtonProps) {
  return (
    <button onClick={onClick} type="button" className="CreateButton">
      <FaPlus className="AddIcon" />
      Crear
    </button>
  );
}
