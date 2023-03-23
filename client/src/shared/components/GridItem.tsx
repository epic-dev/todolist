import styled from "styled-components";

interface IGridItem {
    readonly $column?: string;
    readonly $row?: string;
}
export const GridItem = styled.div<IGridItem>`
    grid-column: ${props => props.$column};
    grid-row: ${props => props.$row};
`;