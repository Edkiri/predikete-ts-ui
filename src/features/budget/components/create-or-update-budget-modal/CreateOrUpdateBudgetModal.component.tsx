import axios from 'axios';
import { useContext, useState } from 'react';
import { AppContext, AppContextInterface } from '../../../../App.context';
import { API_URL } from '../../../../constants';
import { useInputValue } from '../../../../hooks';
import { Loader, ModalContainer } from '../../../ui';
import { Work } from '../../../work/interfaces';
import { useGetBudgetUnits } from '../../hooks';
import { Budget } from '../../interfaces';
import './CreateBudgetModal.css';

interface ModalProps {
  work: Work;
  closeModal: () => void;
  onCreate?: (budget: Budget) => void;
  budget?: Budget;
  onUpdate?: (budget: Budget) => void;
}

export function CreateOrUpdateBudgetModal({
  work,
  budget,
  closeModal,
  onCreate,
  onUpdate,
}: ModalProps) {
  const { user } = useContext(AppContext) as AppContextInterface;
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const { budgetUnits } = useGetBudgetUnits();
  const [budgetUnit, setBudgetUnit] = useState(
    budget ? budget.unit.name : 'UND',
  );
  const description = useInputValue(budget ? budget.description : '');
  const quantity = useInputValue(budget ? budget.quantity : 1);
  const unitPrice = useInputValue(budget ? budget.unitPrice : '');

  const handleOptionChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setBudgetUnit(event.currentTarget.value);
  };

  const handleCreate = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);
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
      setLoading(false);
      if (onCreate) {
        onCreate(data);
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

  const handleUpdate = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const url = `${API_URL}/work/${work.id}/budget/${budget?.id}`;
      const payload = {
        description: description.value,
        quantity: Number(quantity.value),
        unitPrice: Number(unitPrice.value),
        unitName: budgetUnit,
      };
      const { data } = await axios.put<Budget>(url, payload, {
        headers: {
          Authorization: `Bearer ${user?.authToken}`,
        },
      });
      if (onUpdate) {
        onUpdate(data);
        closeModal();
      }
      setLoading(false);
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

  const submitButtonName = budget ? 'Actualizar' : 'Crear';

  return (
    <ModalContainer>
      <form className="CreateBudgetForm">
        <button className="CloseButton" type="button" onClick={closeModal}>
          X
        </button>
        <h3>Nueva partida</h3>
        <label htmlFor="description">
          Descripción
          <input
            id="description"
            type="text"
            {...description}
            disabled={loading}
          />
        </label>
        <div className="UnitContainer">
          <label htmlFor="budgetUnit">
            Unidad
            <select
              id="budgetUnit"
              onChange={handleOptionChange}
              disabled={loading}
            >
              {budgetUnits.map((unit) => (
                <option
                  key={unit.id}
                  value={unit.name}
                  selected={unit.name === budgetUnit}
                >
                  {unit.name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="quantity">
            Cantidad
            <input
              id="quantity"
              type="number"
              {...quantity}
              disabled={loading}
            />
          </label>
          <label htmlFor="unitPrice">
            Precio
            <input
              id="unitPrice"
              type="number"
              {...unitPrice}
              disabled={loading}
            />
          </label>
        </div>
        {errors &&
          errors.map((err) => (
            <span key={err} className="FormError">
              {err}
            </span>
          ))}
        <button
          type="submit"
          className="SubmitButton"
          onClick={budget ? handleUpdate : handleCreate}
          disabled={loading}
        >
          {loading ? (
            <Loader loading={loading} size={22} color="#FFF" />
          ) : (
            submitButtonName
          )}
        </button>
      </form>
    </ModalContainer>
  );
}
