import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { addNewToDo, fetchAll } from "../thunks";
import { IToDo } from "../interfaces/IToDo";
import { useSelector } from "react-redux";

interface IToDoList { }

const ToDoList: FC<IToDoList> = () => {
    const [label, setLabel] = useState('');
    const [entries, setEntries] = useState<IToDo[]>([]);
    const dispatch = useAppDispatch()

    const fetch = () => {
        dispatch(fetchAll());
    }
    const add = () => {
        dispatch(addNewToDo(label))
    }
    
    return (<>
        <button onClick={fetch}>fetch todos</button>
        <br />
        <input onChange={(e) => setLabel(e.target.value)} value={label} />
        <button onClick={add}>add todos</button>
        <ul>
        {
            entries.map(e => <li key={e.label}>{e.label}</li>)
        }
        </ul>
    </>);
};

export default ToDoList;