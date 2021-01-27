import "./sorterView.scss";
import { useEffect, useState } from "react";
import { SorterSubMenu } from "./SorterSubMenu";
import { SORTER_ALGORITHM } from "../../common/enums";
import { onChangeCallBack } from "../../common/appUtil";
import { Observable } from "rxjs";

interface SorterViewProps {
  array: number[];
  algorithm: SORTER_ALGORITHM;
  updateAlgorithm: onChangeCallBack<SORTER_ALGORITHM>;
  observable: Observable<number[]>;
}

export function SorterView(props: SorterViewProps) {
  const { array: arrayProp, algorithm, updateAlgorithm, observable } = props;
  const [array, setArray] = useState<number[]>(arrayProp);

  useEffect(() => {
    const subscription = observable.subscribe((value) => {
      setArray([...value]);
    });
    return () => subscription.unsubscribe();
  }, [array, observable]);

  if (!array) {
    return null;
  }

  return (
    <div className="sorterViewRoot">
      <SorterSubMenu value={algorithm} onChange={updateAlgorithm} />
      <div className="sorterVisualizer">
        {array.map((value, index) => (
          <div key={index} className={"element" + value} />
        ))}
      </div>
    </div>
  );
}
