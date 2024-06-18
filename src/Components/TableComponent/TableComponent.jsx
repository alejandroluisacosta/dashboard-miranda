import styled from "styled-components";

const Table = styled.div`
    background-color: white;
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
        <>
            <Table>
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
            </Table>
        </>
    )
}

export default TableComponent;