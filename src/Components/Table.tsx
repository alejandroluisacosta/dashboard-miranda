import React, { ReactNode } from "react";
import styled from "styled-components";
import { Booking, Room } from "../types";

const Grid = styled.div`
    display: grid;
    background-color: white;
    margin: 0 50px 30px;
    border-radius: 20px;
    padding: 20px 30px;
    div {
        border-bottom: 1px solid #ccc;
    }
    .grid-header-item {
        padding: 20px 0;
    }
    .grid-cell {
        padding: 24px 10px;
    }
`;

interface TableProps {
    data: Room[] | Booking[];
    columns: {
        label: string;
        display?: (arg: Booking | Room) => ReactNode;
        property?: string;
    }[];
}

const Table: React.FC<TableProps> = ({ data, columns }) => {
    return (
        <Grid style={{ gridTemplateColumns: `repeat(${columns.length}, auto)` }}>
            {columns.map((column, index) => 
                <div className="grid-header-item" key={index}>{column.label}</div>
            )}
            {data.map(row => 
                columns.map((column, index) => 
                    <div className="grid-cell" key={index}>{column.display ? column.display(row) : row[column.property as keyof typeof row]}</div>
                )
            )}
        </Grid>
    )
}

export default Table;
