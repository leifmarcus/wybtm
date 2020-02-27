import React, { ReactNode } from 'react';
import './ValueTable.css';

type ValueTableProps = {
    headerFields?: Array<ReactNode>;
};

export const ValueTable: React.FunctionComponent<ValueTableProps> = props => {
    return <div className="ValueTable">{props.children}</div>;
};
