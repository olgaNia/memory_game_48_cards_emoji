import './App.css';
import {useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import Board from "./components/Board";

function App() {

    const emoji = ['🦊', '🦝', '🦒', '🦐', '🦜', '🦋',
                   '📱', '🐞', '🕸️', '🚛', '🧙', '🤹',
                   '🚴‍♀️', '🎁', '👓', '🎮', '⏰', '🍕',
                   '🍔', '🍉', '🌵', '✈️', '⛺','❄️'];
    const [cards, setCards] = useState(new Array(48).fill(null).map(() => (
        {
            id: uuidv4(),
            img: null,
            isOpen: false,
        }
    )));
    const [history, setHistory] = useState([]);
    const [block, setBlock] = useState(false);
    const [winner, setWinner] = useState(false);
    const [resultMove, setResultMove] = useState([])

    const randomPlace = () => {
        const newCards = cards.map(el =>
            ({...el, img: null,isOpen:false}))

        for (let i = 0; i < emoji.length; i++) {
            for (let time = 1; time <= 2; time++) {
                let index
                do {
                    index = Math.trunc(Math.random() * newCards.length)
                } while (
                    newCards[index].img !== null)
                newCards[index].img = emoji[i]
            }
        }
        setCards(newCards)
    }


    useEffect(() => {
        randomPlace()
    }, [])


    const openCard = (id, img) => {
        const isOpen = cards.find(el =>
            el.id === id
        ).isOpen
        if (!block && !isOpen) {
            const newCards = cards.map((el) =>
                el.id === id ? {...el, isOpen: true} : el)
            setCards(newCards)
            setHistory([...history, img])
            setBlock(true)
        }
    }

    const checkMove = () => {
        if (history[history.length - 1] !== history[history.length - 2]) {
            const emoji1 = history[history.length - 1]
            const emoji2 = history[history.length - 2]
            const newCards = cards.map(el =>
                el.img === emoji1 || el.img === emoji2 ?
                    {...el, isOpen: false,} : el)
            setCards(newCards)
        }
    }

    useEffect(() => {
        if (history.length % 2 === 0) {
            setTimeout(() => {
                checkMove()
                setBlock(false)
            }, 500)
        } else {
            setBlock(false)
        }
    }, [history])

    const checkWinner = () => {
        const win = cards.every(el => el.isOpen)//every это метод
        if (win) {setResultMove([...resultMove, history.length / 2])}
        setWinner(win)
    }

    useEffect(() => {
        if (history.length > 12) {
            checkWinner()
        }
    }, [history])

    const restart=()=>{
        randomPlace()
        setHistory([])
        setWinner(false)
        setBlock(false)
    }


    return (
        <div className="App">
            {history}
            <h1>Memory Game</h1>
            <Board
                cards={cards}
                openCard={openCard}
            />
            {winner &&
                <>
                    <h3> Congratulation,You won in {history.length / 2} moves!</h3>
                    <button onClick={restart}> Start Game</button>
                </>
            }
            <div>
                {resultMove.length > 0 &&
                    <div>
                        moves: {resultMove.map((el, i) =>
                        (i === resultMove.length - 1) ?
                            el : el + ",")}
                    </div>
                }
            </div>
        </div>
    );
}

export default App;
