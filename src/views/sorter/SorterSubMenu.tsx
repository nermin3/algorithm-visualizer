import { SorterSelect, SorterSelectProps } from "../../components/sorterSelect/sorterSelect";

export function SorterSubMenu(props: SorterSelectProps) {
  const { value, onChange } = props;
  return <div className="sorterSubMenu">
    <div className="sortSelectRoot"><SorterSelect value={value} onChange={onChange} /></div>
  </div>;
}
