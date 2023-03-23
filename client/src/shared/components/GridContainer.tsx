import styled from "styled-components";

interface IGridContainer {
    readonly $columns?: number | string[];
    readonly $rows?: number | string[];
    readonly $gutter?: number | string;
    readonly $gutterX?: number | string;
    readonly $gutterY?: number | string;
    readonly $width?: number | string; // by default number of pixels, string could be in percents/viewport units/etc
    readonly $height?: number | string; // by default number of pixels, string could be in percents/viewport units/etc
    readonly $padding?: number | string;
}
/**
 * the very common functionality
 * TODO: specify different property values
 */
export const GridContainer = styled.div<IGridContainer>`
    box-sizing: border-box;
    padding: ${props => {
        if (typeof props.$padding === 'number') {
            return `${props.$padding}px`;
        }
        return props.$padding;
    }};
    display: grid;
    grid-template-columns: ${(props) => {
        if(typeof props.$columns === 'number') {
            return `repeat(${props.$columns}, 1fr)`;
        }
        return props.$columns?.join(' ');
    }};
    grid-template-rows: ${(props) => {
        if(typeof props.$rows === 'number') {
            return `repeat(${props.$rows}, 1fr)`;
        }
        return props.$rows?.join(' ');
    }};
    grid-gap: ${(props) => {
        if (typeof props.$gutter === 'number') {
            return `${props.$gutter}px`;
        }
        return props.$gutter;
    }};
    grid-column-gap: ${(props) => props.$gutterX};
    grid-row-gap: ${(props) => props.$gutterY};
    width: ${(props) => {
        if(typeof props.$width === 'number') {
            return `${props.$width}px`;
        }
        return props.$width;
    }};
    height: ${(props) => {
        if(typeof props.$height === 'number') {
            return `${props.$height}px`;
        }
        return props.$height;
    }};
`;