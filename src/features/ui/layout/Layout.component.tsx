import { ChildrenProp } from '../../../interfaces';
import { Footer } from '../footer/Footer.component';
import { Header } from '../header/Header.component';
import './Layout.css';

export function Layout({ children }: ChildrenProp) {
  return (
    <div id="Layout" className="Layout">
      <Header />
      <div className="LayoutContentContainer">{children}</div>
      <Footer />
    </div>
  );
}
