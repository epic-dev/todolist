import { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { addNewToDo, fetchAll } from "../thunks";
import { Drawer } from "./Drawer";
import { FlexContainer, TextInput } from "../../../shared/components";
import { GridContainer } from "../../../shared/components/GridContainer";
import { GridItem } from "../../../shared/components/GridItem";

interface IToDoList { }

const ToDoList: FC<IToDoList> = () => {
    const [label, setLabel] = useState('');
    const dispatch = useAppDispatch()
    const MOCK = [
        {id: 1, label: 'test'},
        {id: 2, label: 'test'},
        {id: 3, label: 'test'},
        {id: 4, label: 'test'},
        {id: 5, label: 'test'},
        {id: 6, label: 'test'},
    ]
    // const entries = useAppSelector(state => state.todos.entries) ?? MOCK //[]
    const entries = MOCK //[]

    const fetch = () => {
        dispatch(fetchAll());
    }
    const add = () => {
        dispatch(addNewToDo(label));
        setLabel('');
        dispatch(fetchAll());
    }
    const getItems = () => {
        return <ul style={{ color: 'white'}}>{entries.map(e => <li key={e.id}>{e.label}</li>)}</ul>
    }

    // TODO: instead of 300px use minmax()
    return (<GridContainer
            $columns={['300px', 'auto']}
            $rows={['auto', '50px']}
            $height={'100vh'}
            $padding={24}
            $gutter={24}
        >
        <GridItem $row="1 / span 2">
            <Drawer />
        </GridItem>
        <GridItem $row="1 / 2" $column="2 / -1">
            {
                entries.length > 0 && getItems()
            }
        </GridItem>
        <GridItem $row="2 / -1">
            <footer style={{ /* position: '-webkit-sticky', */ position: 'sticky', bottom: 0}}>
                <TextInput
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLabel(e.target.value)}
                    value={label}
                    label=" + Add new To Do"
                    type="text"
                    required
                />
            </footer>
        </GridItem>
    </GridContainer>);
};

export default ToDoList;