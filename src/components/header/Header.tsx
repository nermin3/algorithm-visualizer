import './header.scss';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <div className="headerRoot">
      <div>Algorithm Visualizer</div>
      <Link to="sorters">Sorters</Link>
      <Link to="path-finding">Path finding</Link>
    </div>
  );
}
