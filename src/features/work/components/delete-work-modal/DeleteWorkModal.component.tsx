import axios from 'axios';
import { useContext, useState } from 'react';
import { AppContext, AppContextInterface } from '../../../../App.context';
import { API_URL } from '../../../../constants';
import {
  DeleteButton,
  Loader,
  ModalContainer,
  SecondaryButton,
} from '../../../ui';
import { Work } from '../../interfaces';

interface DeleteWorkProps {
  work: Work;
  closeModal: () => void;
  onDelete: () => void;
}

export function DeleteWorkModal({
  work,
  closeModal,
  onDelete,
}: DeleteWorkProps) {
  const { user } = useContext(AppContext) as AppContextInterface;
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const url = `${API_URL}/work/${work.id}`;
    try {
      const { data } = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${user?.authToken}`,
        },
      });
      setLoading(false);
      if (data.message === 'Work deleted') {
        closeModal();
        onDelete();
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <ModalContainer>
      <div className="DeleteModalContainer">
        <h3>¿Eliminar esta obra?</h3>
        <p className="DescriptionText">{work.description}</p>
        <div className="ButtonsContainer">
          <SecondaryButton
            title="Cancelar"
            onClick={closeModal}
            disabled={loading}
          />
          <DeleteButton onClick={handleDelete} disabled={loading} />
        </div>
        {loading && <Loader loading={loading} size={25} />}
      </div>
    </ModalContainer>
  );
}
