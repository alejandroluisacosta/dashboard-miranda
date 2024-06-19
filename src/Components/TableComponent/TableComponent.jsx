import styled from "styled-components";

const Grid = styled.div`
    display: grid;
    background-color: white;
    margin: 30px 50px;
    border-radius: 20px;
    table {
        table-layout: auto;
    }
    table {
        width: 100%;
        padding: 20px 30px;
        border-collapse: collapse;
        text-align: left;
    }
    th, td {
        border-bottom: 1px solid #ccc;
    }
    th {
        padding: 20px 30px;
    }
    td {
        padding: 24px 0;
    }
`;

const TableComponent = ({ data, columns }) => {
    return (
        <Grid style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}>
            <div class="grid-container">
                <div class="grid-header">
                    {columns.map(column => 
                        <div class="grid-header-item">{column}</div>
                    )}
                </div>
                <div class="grid-body">
                    {data.map(row => 
                        <div class="grid-row">
                            {Object.values(row).map(dataPoint => 
                                <div class="grid-cell">{dataPoint}</div>
                            )}
                        </div>  
                    )}
                </div>
            </div>
        </Grid>
    )
}

export default TableComponent;

{/* <Table>
<table>
    <thead>
        <tr>
            {columns.map(column => 
                <th>{column}</th>
            )}
        </tr>
    </thead>
    <tbody>
        {data.map(row => 
            <tr>
                {Object.values(row).map(dataPoint => 
                    <td>{dataPoint}</td>
                )}
            </tr>  
        )}
    </tbody>
</table>
</Table> */}