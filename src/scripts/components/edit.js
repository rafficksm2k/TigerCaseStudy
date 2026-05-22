import React, { useState } from "react"

const Edit = (props) => {

    const [inputFields, setInputFields] = useState({
        StoreID: props.selectedProduct['StoreID'],
        SKU: props.selectedProduct['SKU'],
        ProductName: props.selectedProduct['ProductName'],
        Price: props.selectedProduct['Price'],
        Date: props.selectedProduct['Date']
    });

    function onInputChange(value, key) {
        setInputFields((prevState) => {
            return { ...prevState, [key]: value };
        });
    }

    function onUpdate(event) {
        props.onUpdate(inputFields, event);
    }

    return (
        <div class="form-group">
            {
                Object.keys(inputFields).map((key) => {
                    return <div>
                        <label for="inputdefault">{key}</label>
                        {key === 'StoreID' || key === 'SKU' ?
                            <input class="form-control" id="inputdefault" readonly type="text" value={inputFields[key]} />
                            : <input class="form-control" id="inputdefault" type="text"
                                onChange={(e) => onInputChange(e.target.value, key)} value={inputFields[key]} />
                        }
                    </div>
                }
                )
            }
            <div class="btn-group" role="group">
                <button type="button" class="btn btn-info btn-update mr-1" onClick={() => onUpdate('update')}>Update</button>
                <button type="button" class="btn btn-info" onClick={() => onUpdate('cancel')}>Cancel</button>
            </div>
        </div>
    )
};

export default Edit;
