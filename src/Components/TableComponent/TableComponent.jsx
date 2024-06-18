const TableComponent = ({ data, columns }) => {
    return (
        <>
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
        </>
    )
}

export default TableComponent;