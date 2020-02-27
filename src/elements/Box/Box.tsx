import React from 'react';
import './Box.css';

type BoxProps = {
    title?: string;
};

export const Box: React.FunctionComponent<BoxProps> = props => {
    return (
        <section className="Box">
            {props.title && <h2 className="Box__title">{props.title}</h2>}
            <div className="Box__content">{props.children}</div>
        </section>
    );
};
