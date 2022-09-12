import { useState, useContext } from 'react';
import axios from 'axios';

import { Loader, ModalContainer } from '../../../ui';
import { AppContext, AppContextInterface } from '../../../../App.context';
import { API_URL } from '../../../../constants';
import { useInputValue } from '../../../../hooks';
import { ApiWorkResponse, useGetWorkTypes } from '../../hooks';
import { Work } from '../../interfaces';
import './CreateOrUpdateWorkModal.css';

interface ModalProps {
  closeModal: () => void;
  work?: Work;
  onUpdate?: (work: Work) => void;
  onCreate?: (work: Work) => void;
}

export function CreateOrUpdateWorkModal({
  closeModal,
  work,
  onCreate,
  onUpdate,
}: ModalProps) {
  const { user } = useContext(AppContext) as AppContextInterface;
  const { workTypes } = useGetWorkTypes();
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [workType, setWorkType] = useState(work ? work.type : 'Remodelación');
  const description = useInputValue(work ? work.description : '');
  const clientName = useInputValue(work ? work.clientName : '');

  const handleCreateSubmit = async (event: React.SyntheticEvent) => {
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
      if (onCreate) {
        onCreate({ ...data, type: data.type.name });
        setLoading(false);
        closeModal();
      }
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

  const handleUpdateSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);
    const payload = {
      typeName: workType,
      description: description.value,
      clientName: clientName.value,
    };
    try {
      const url = `${API_URL}/work`;
      const { data } = await axios.put<ApiWorkResponse>(url, payload, {
        headers: {
          Authorization: `Bearer ${user?.authToken}`,
        },
      });
      if (onUpdate) {
        onUpdate({ ...data, type: data.type.name });
        setLoading(false);
        closeModal();
      }
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

  const buttonTitle = work ? 'Actualizar' : 'Crear';

  return (
    <ModalContainer>
      <form className="CreateWorkModal">
        <button className="CloseButton" type="button" onClick={closeModal}>
          X
        </button>
        <h3>{work ? 'Actualizar obra' : 'Nueva Obra'}</h3>
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
              <option
                key={type.id}
                value={type.name}
                selected={type.name === workType}
              >
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
        <button
          type="submit"
          className="SubmitButton"
          onClick={work ? handleUpdateSubmit : handleCreateSubmit}
        >
          {loading ? (
            <Loader loading={loading} size={22} color="#FFF" />
          ) : (
            buttonTitle
          )}
        </button>
      </form>
    </ModalContainer>
  );
}
