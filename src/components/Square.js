import React from 'react';

const Square = (props) => {


    return (
        <button className="card" onClick={()=>props.openCard(props.card.id,props.card.img)}>
            {props.card.isOpen ? props.card.img : null}
        </button>
    );
};

export default Square;