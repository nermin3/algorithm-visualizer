import './sorterView.scss';
import { Observable } from 'rxjs';
import { heapSort } from '../../common/sorters';
import { sortService } from './SortService';
import { useEffect, useState } from 'react';

interface SorterViewProps {
  observable: Observable<number[]>;
}

export function SorterView(props: SorterViewProps) {
  const [array, setArray] = useState<number[]>(
    sortService.arraySubject.getValue()
  );

  useEffect(() => {
    const subscription = sortService.arraySubject.subscribe((value) => {
      setArray([...value]);
    });
    heapSort(array, sortService.updateArray);
    return () => subscription.unsubscribe();
  }, []);

  if (!array) {
    return null;
  }

  return (
    <div className="sorterViewRoot">
      {array.map((value, index) => (
        <div key={index} className={'element' + value} />
      ))}
    </div>
  );
}
