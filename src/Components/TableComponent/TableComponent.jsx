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
        padding: 24px 0;
    }
`;

const TableComponent = ({ data, columns }) => {
    return (
        <Grid style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}>
            {columns.map(column => 
                <div className="grid-header-item">{column.label}</div>
            )}
            {data.map(row => 
                Object.values(row).map((dataPoint, index) => 
                    <div className="grid-cell">{columns[index].display ? columns[index].display(dataPoint) : dataPoint}</div>
                )
            )}
        </Grid>
    )
}

export default TableComponent;
