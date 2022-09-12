import { useState, useContext } from 'react';
import axios from 'axios';

import { AppContext, AppContextInterface } from '../../../../App.context';
import { API_URL } from '../../../../constants';
import { useInputValue } from '../../../../hooks';
import { ModalContainer } from '../../../ui';
import { WorkType } from '../../interfaces';
import './CreateWorkTypeModal.css';

interface ModalProps {
  closeModal: () => void;
  onCreate: (workType: WorkType) => void;
}

export function CreateWorkTypeModal({ closeModal, onCreate }: ModalProps) {
  const { user } = useContext(AppContext) as AppContextInterface;
  const name = useInputValue('');
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const url = `${API_URL}/work-type`;
      const { data } = await axios.post<WorkType>(
        url,
        { name: name.value },
        {
          headers: { Authorization: `Bearer ${user?.authToken}` },
        },
      );
      setLoading(false);
      closeModal();
      onCreate(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setLoading(false);
      if (Array.isArray(err.response.data.message))
        setErrors([...err.response.data.message]);
      else {
        setErrors([err.response.data.message]);
      }
    }
  };

  return (
    <ModalContainer>
      <form onSubmit={handleSubmit} className="CreateWorkTypeModal">
        <button className="CloseButton" type="button" onClick={closeModal}>
          X
        </button>
        <h3>Nuevo tipo de obra</h3>
        <label htmlFor="name">
          Nombre
          <input id="name" type="text" {...name} disabled={loading} />
        </label>
        {errors &&
          errors.map((err) => (
            <span key={err} className="FormError">
              {err}
            </span>
          ))}
        <button type="button" className="SubmitButton">
          Crear
        </button>
      </form>
    </ModalContainer>
  );
}
