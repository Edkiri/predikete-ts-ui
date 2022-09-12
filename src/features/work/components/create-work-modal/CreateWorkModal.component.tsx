import { useState, useContext } from 'react';
import axios from 'axios';

import { Loader, ModalContainer } from '../../../ui';
import { AppContext, AppContextInterface } from '../../../../App.context';
import { API_URL } from '../../../../constants';
import { useInputValue } from '../../../../hooks';
import { ApiWorkResponse, useGetWorkTypes } from '../../hooks';
import { Work } from '../../interfaces';
import './CreateWorkModal.css';

interface ModalProps {
  closeModal: () => void;
  onCreate: (work: Work) => void;
}

export function CreateWorkModal({ closeModal, onCreate }: ModalProps) {
  const { user } = useContext(AppContext) as AppContextInterface;
  const { workTypes } = useGetWorkTypes();
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [workType, setWorkType] = useState('Remodelación');
  const description = useInputValue('');
  const clientName = useInputValue('');

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);
    const payload = {
      typeName: workType,
      description: description.value,
      clientName: clientName.value,
    };
    try {
      const url = `${API_URL}/work`;
      const { data } = await axios.post<ApiWorkResponse>(url, payload, {
        headers: {
          Authorization: `Bearer ${user?.authToken}`,
        },
      });
      onCreate({ ...data, type: data.type.name });
      setLoading(false);
      closeModal();
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

  const handleOptionChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setWorkType(event.currentTarget.value);
  };

  return (
    <ModalContainer>
      <form className="CreateWorkModal">
        <button className="CloseButton" type="button" onClick={closeModal}>
          X
        </button>
        <h3>Nueva obra</h3>
        <label htmlFor="description">
          Descripción
          <input
            id="description"
            type="text"
            {...description}
            disabled={loading}
          />
        </label>
        <label htmlFor="clientName">
          Cliente
          <input
            id="clientName"
            type="text"
            {...clientName}
            disabled={loading}
          />
        </label>
        <label htmlFor="workType">
          Tipo
          <select
            id="workType"
            onChange={handleOptionChange}
            disabled={loading}
          >
            {workTypes.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </label>
        {errors &&
          errors.map((err) => (
            <span key={err} className="FormError">
              {err}
            </span>
          ))}
        <button type="submit" className="SubmitButton" onClick={handleSubmit}>
          {loading ? (
            <Loader loading={loading} size={22} color="#FFF" />
          ) : (
            'Crear'
          )}
        </button>
      </form>
    </ModalContainer>
  );
}
