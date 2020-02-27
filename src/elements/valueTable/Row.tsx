import React, { ReactNode } from 'react';
import './Row.css';

type RowProps = {
    label: ReactNode;
    value: ReactNode;
    description: ReactNode;
};

export const Row: React.FunctionComponent<RowProps> = props => {
    return (
        <div className="Row">
            <div className="Row__column Row__label">{props.label}</div>
            <div className="Row__column Row__value">{props.value}</div>
            <div className="Row__column Row__description">{props.description}</div>
        </div>
    );
};
