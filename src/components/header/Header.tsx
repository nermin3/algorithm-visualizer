import './header.scss';
import { SorterSelect, SorterSelectProps } from '../sorterSelect/sorterSelect';

interface HeaderProps extends SorterSelectProps {}

export function Header(props: HeaderProps) {
  const { value, onChange } = props;
  return (
    <div className="headerRoot">
      <div>Algorithm Visualizer</div>
      <SorterSelect value={value} onChange={onChange} />
    </div>
  );
}
