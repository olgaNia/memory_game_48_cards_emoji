import React from 'react';
import Square from "./Square";

const Board = (props) => {
    return (
        <div className="boardstyle">
            {props.cards.map(el =>
                <Square key={el.id}
                        card={el}
                        openCard={props.openCard}
                />
            )}

        </div>
    );
};

export default Board;