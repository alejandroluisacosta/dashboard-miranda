import React from "react";
import styled from "styled-components";
import { Booking, Column, CommentInterface, Room, User } from "../types";

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
        padding: 20px 10px;
    }
    .grid-cell {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 24px 10px;
    }
`;

interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
}

const Table: React.FC<TableProps<any>> = ({ data, columns }) => {
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
