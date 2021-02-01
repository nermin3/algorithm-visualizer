import React, { useEffect, useState } from 'react';
import { MATRIX_MARKER } from '../../common/enums';
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import './pathFinding.scss';
import { Observable } from 'rxjs';

interface PathFindingViewProps {
  grid: MATRIX_MARKER[][];
  updateCell: (newX: number, newY: number) => void;
  gridObservable: Observable<MATRIX_MARKER[][]>;
}

export function PathFindingView(props: PathFindingViewProps) {
  const { grid: gridProp, updateCell, gridObservable } = props;

  const [grid, setGrid] = useState(gridProp);

  useEffect(() => {
    const gridSubscription = gridObservable.subscribe((value) => {
      setGrid([...value]);
    });

    return () => {
      gridSubscription.unsubscribe();
    };
  }, []);

  return (
    <div className="pathFindingViewRoot">
      <Table>
        <TableBody>
          {grid.map((columns, x) => {
            return (
              <TableRow key={x}>
                {columns.map((column, y) => {
                  const onCellClick = () => {
                    updateCell(x, y);
                  };
                  return (
                    <TableCell
                      key={y}
                      className={column}
                      onClick={onCellClick}
                    />
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
