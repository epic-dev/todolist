import { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { addNewToDo, fetchAll } from "../thunks";

interface IToDoList { }

const ToDoList: FC<IToDoList> = () => {
    const [label, setLabel] = useState('');
    const dispatch = useAppDispatch()
    const entries = useAppSelector(state => state.todos.entries) ?? []

    const fetch = () => {
        dispatch(fetchAll());
    }
    const add = () => {
        dispatch(addNewToDo(label));
        setLabel('');
        dispatch(fetchAll());
    }
    
    return (<>
        <button onClick={fetch}>fetch todos</button>
        <br />
        <input onChange={(e) => setLabel(e.target.value)} value={label} />
        <button onClick={add}>add todos</button>
        <ul>
        {
            entries.map(e => <li key={e.id}>{e.label}</li>)
        }
        </ul>
    </>);
};

export default ToDoList;