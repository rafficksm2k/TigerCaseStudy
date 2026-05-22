import React, { Component, useState, useContext } from 'react';
import Table from '../components/table';
import Edit from '../components/edit';
import Search from '../components/search';
import Pagination from '../components/pagination';
import Upload from '../components/upload';
import Header from '../components/header';
import Footer from '../components/footer';
import { StoreContext } from '../../App';
import {
    SET_PRODUCT, SET_FILTERED_PRODUCT, SET_HEADER, SET_SHOW_TABLE,
    SET_EDIT_TABLE, SET_SELECTED_PRODUCT, SET_CURRENT_PAGE, SET_TABLE_SIZE
} from '../actionCreator/actionBind';

function Container(props) {
    const storeContext = useContext(StoreContext);
    // We can also use same reducer/StoreContext for below states as well
    const [tableViewProducts, setTableViewProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});

    const { store } = storeContext;

    function convert(string) {
        let lines = string.split("\n");
        let result = [];
        let headers;
        headers = lines[0].split(",");
        for (let i = 1; i < lines.length; i++) {
            let obj = {};
            if (lines[i] === undefined || lines[i].trim() === "") {
                continue;
            }
            let words = lines[i].split(",");
            for (var j = 0; j < words.length; j++) {
                obj[headers[j].trim().replace(/(\r\n|\n|\r)/gm, "")] =
                    words[j].replace(/(\r\n|\n|\r)/gm, "");
            }
            result.push(obj);
        }
        return result;
    }

    function handleChange(newValue, storeId, sku) {
        setSelectedProduct(store.products.find((product) => {
            return (storeId === product.StoreID && sku === product.SKU);
        }));
        storeContext.dispatch({ type: SET_SHOW_TABLE, showTable: newValue });
        storeContext.dispatch({ type: SET_EDIT_TABLE, editTable: true });
    }

    function uploadFile() {
        var fileUpload = document.getElementById("fileUpload");
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
        if (regex.test(fileUpload.value.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                reader.onload = function (e) {
                    const csvArray = convert(e.target.result.trim());
                    storeContext.dispatch({ type: SET_PRODUCT, products: csvArray });
                    storeContext.dispatch({ type: SET_TABLE_SIZE, tableSize: csvArray.length });
                    const firstPageIndex = (store.currentPage - 1) * store.pageSize;
                    const lastPageIndex = firstPageIndex + store.pageSize;
                    storeContext.dispatch({ type: SET_FILTERED_PRODUCT, filteredProduct: csvArray });
                    setTableViewProducts(csvArray.slice(firstPageIndex, lastPageIndex));

                    let headerArr = [];
                    Object.keys(csvArray[0]).map((key) => (
                        headerArr.push(key)
                    ));
                    storeContext.dispatch({ type: SET_HEADER, header: headerArr });
                    storeContext.dispatch({ type: SET_SHOW_TABLE, showTable: true });
                    storeContext.dispatch({ type: SET_EDIT_TABLE, editTable: false });
                }
                reader.readAsText(fileUpload.files[0]);
            } else {
                alert("This browser does not support HTML5.");
            }
        } else {
            alert("Please upload a valid CSV file.");
        }
    }

    function onUpdate(updatedValue, event) {
        if (event === 'update') {
            const currentIndex = store.products.findIndex((product) => (product.StoreID === updatedValue.StoreID && product.SKU === updatedValue.SKU));
            const newProducts = [...store.products];
            newProducts[currentIndex] = updatedValue;
            storeContext.dispatch({ type: SET_PRODUCT, products: newProducts });
            defaultTabelViewData(newProducts);
        }
        storeContext.dispatch({ type: SET_SHOW_TABLE, showTable: true });
        storeContext.dispatch({ type: SET_EDIT_TABLE, editTable: false });
    }

    function onCancel() {
        storeContext.dispatch({ type: SET_SHOW_TABLE, showTable: true });
        storeContext.dispatch({ type: SET_EDIT_TABLE, editTable: false });
    }

    function uploadNew() {
        storeContext.dispatch({ type: SET_SHOW_TABLE, showTable: false });
        storeContext.dispatch({ type: SET_EDIT_TABLE, editTable: false });
    }

    const onSearch = (key, value) => {
        // Avoid filter for empty string
        if (!value) {
            defaultTabelViewData();
            return;
        }
        const filteredData = store.products.filter(
            (product) => product[key].toLowerCase().includes(value.toLowerCase())
        );
        storeContext.dispatch({ type: SET_TABLE_SIZE, tableSize: filteredData.length });
        defaultTabelViewData(filteredData);
    }

    function defaultTabelViewData(value) {
        const firstPageIndex = (store.currentPage - 1) * store.pageSize;
        const lastPageIndex = firstPageIndex + store.pageSize;
        if (value) {
            storeContext.dispatch({ type: SET_FILTERED_PRODUCT, filteredProduct: value });
            setTableViewProducts(value.slice(firstPageIndex, lastPageIndex));
        } else {
            storeContext.dispatch({ type: SET_FILTERED_PRODUCT, filteredProduct: [] });
            setTableViewProducts(store.products.slice(firstPageIndex, lastPageIndex));
            storeContext.dispatch({ type: SET_TABLE_SIZE, tableSize: store.products.length });
        }
    }

    function onPageChange(page) {
        storeContext.dispatch({ type: SET_CURRENT_PAGE, currentPage: page });

        const firstPageIndex = (page - 1) * store.pageSize;
        const lastPageIndex = firstPageIndex + store.pageSize;
        setTableViewProducts(store.filteredProduct.slice(firstPageIndex, lastPageIndex));
    }

    return (
        <>
            <Header />
            <hr />
            {!store.showTable ? (<Upload uploadFile={uploadFile} />)
                : (<>
                    <Search onSearch={onSearch} uploadNew={uploadNew} />
                    <hr />
                    <Table productHeader={store.header} products={tableViewProducts} handleChange={handleChange} />
                    <Pagination
                        className="pagination-bar"
                        currentPage={store.currentPage}
                        totalCount={store.tableSize}
                        pageSize={store.pageSize}
                        onPageChange={onPageChange}
                    /> </>
                )}
            {store.editTable && (<Edit selectedProduct={selectedProduct} onUpdate={onUpdate} />)}
        </>
    );
}

export default Container;
