import { ChildrenProp } from '../../../interfaces';
import { Header } from '../header/Header.component';
import './Layout.css';

export function Layout({ children }: ChildrenProp) {
  return (
    <div id="Layout" className="Layout">
      <Header />
      <div className="LayoutContentContainer">{children}</div>
    </div>
  );
}
