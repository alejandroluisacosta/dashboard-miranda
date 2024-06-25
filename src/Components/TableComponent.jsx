import styled from "styled-components";

const Grid = styled.div`
    display: grid;
    background-color: white;
    margin: 30px 50px;
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

const TableComponent = ({ data, columns }) => {
    return (
        <Grid style={{ gridTemplateColumns: `repeat(${columns.length}, auto)` }}>
            {columns.map((column, index) => 
                <div className="grid-header-item" key={index}>{column.label}</div>
            )}
            {data.map(row => 
                Object.values(row).map((dataPoint, index) => 
                    <div className="grid-cell" key={index}>{columns[index].display ? columns[index].display(dataPoint) : dataPoint}</div>
                )
            )}
        </Grid>
    )
}

export default TableComponent;
