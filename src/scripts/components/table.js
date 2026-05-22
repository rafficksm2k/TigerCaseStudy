import React from "react";
import ReactTable from 'react-table';

const Table = (props) => {

    function edit(storeId, sku) {
        props.handleChange(false, storeId, sku);
    }

    return (
        <div class="table-responsive">
            <table class="table table-striped">
                <thead>
                    <tr key={"header"}>
                        {
                            props.productHeader && props.productHeader.map((item) => {
                                return <th>{item}</th>
                            })
                        }
                        <th>{'Edit'}</th>
                    </tr>
                </thead>
                <tbody>
                    {props.products && props.products.map((item, index) => (
                        <tr key={index}>
                            {Object.values(item).map((val) => (
                                <td>{val}</td>
                            ))}
                            <td><a href="#" onClick={() => edit(item.StoreID, item.SKU)}>Edit</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default Table;
