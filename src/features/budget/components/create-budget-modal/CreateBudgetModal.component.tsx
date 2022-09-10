import axios from 'axios';
import { useContext, useState } from 'react';
import { AppContext, AppContextInterface } from '../../../../App.context';
import { API_URL } from '../../../../constants';
import { useInputValue } from '../../../../hooks';
import { ModalContainer } from '../../../ui';
import { Work } from '../../../work/interfaces';
import { useGetBudgetUnits } from '../../hooks';
import { Budget } from '../../interfaces';
import './CreateBudgetModal.css';

interface ModalProps {
  closeModal: () => void;
  work: Work;
  onCreate: (budget: Budget) => void;
}

export function CreateBudgetModal({ work, closeModal, onCreate }: ModalProps) {
  const { user } = useContext(AppContext) as AppContextInterface;
  const [errors, setErrors] = useState<string[]>([]);

  const { budgetUnits } = useGetBudgetUnits();
  const [budgetUnit, setBudgetUnit] = useState('UND');
  const description = useInputValue('');
  const quantity = useInputValue(1);
  const unitPrice = useInputValue('');

  const handleOptionChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setBudgetUnit(event.currentTarget.value);
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const url = `${API_URL}/work/${work.id}/budget`;
      const payload = {
        description: description.value,
        quantity: Number(quantity.value),
        unitPrice: Number(unitPrice.value),
        workDescription: work.description,
        unitName: budgetUnit,
      };
      const { data } = await axios.post<Budget>(url, payload, {
        headers: {
          Authorization: `Bearer ${user?.authToken}`,
        },
      });
      onCreate(data);
      closeModal();
      console.log(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (Array.isArray(err.response.data.message))
        setErrors([...err.response.data.message]);
      else {
        setErrors([err.response.data.message]);
      }
    }
  };

  return (
    <ModalContainer>
      <form className="CreateBudgetForm">
        <button className="CloseButton" type="button" onClick={closeModal}>
          X
        </button>
        <h3>Nueva partida</h3>
        <label htmlFor="description">
          Descripción
          <input id="description" type="text" {...description} />
        </label>
        <div className="UnitContainer">
          <label htmlFor="budgetUnit">
            Unidad
            <select id="budgetUnit" onChange={handleOptionChange}>
              {budgetUnits.map((unit) => (
                <option
                  key={unit.id}
                  value={unit.name}
                  selected={unit.name === 'UND'}
                >
                  {unit.name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="quantity">
            Cantidad
            <input id="quantity" type="number" {...quantity} />
          </label>
          <label htmlFor="unitPrice">
            Precio
            <input id="unitPrice" type="number" {...unitPrice} />
          </label>
        </div>
        {errors &&
          errors.map((err) => (
            <span key={err} className="FormError">
              {err}
            </span>
          ))}
        <button type="submit" className="SubmitButton" onClick={handleSubmit}>
          Crear
        </button>
      </form>
    </ModalContainer>
  );
}
