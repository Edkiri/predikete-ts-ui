import { ChildrenProp } from '../../../interfaces';
import './ModalContainer.css';

export function ModalContainer({ children }: ChildrenProp) {
  return <div className="ModalContainer">{children}</div>;
}
