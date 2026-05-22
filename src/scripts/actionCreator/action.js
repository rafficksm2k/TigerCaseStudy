import {SET_PRODUCT, SET_FILTERED_PRODUCT, SET_HEADER, SET_SHOW_TABLE,
    SET_EDIT_TABLE, SET_SELECTED_PRODUCT, SET_CURRENT_PAGE, SET_TABLE_SIZE} from './actionBind';

function setProducts() {
    return {
        type: SET_PRODUCT
    }
}

function setFilteredProduct() {
    return {
        type: SET_FILTERED_PRODUCT
    }
}

function setTableViewProducts() {
    return {
        type: SET_TABLE_VIEW_PRODUCT
    }
}

function setHeader() {
    return {
        type: SET_HEADER
    }
}

function setShowTable() {
    return {
        type: SET_SHOW_TABLE
    }
}

function setEditTable() {
    return {
        type: SET_EDIT_TABLE
    }
}

function setSelectedProduct() {
    return {
        type: SET_SELECTED_PRODUCT
    }
}

function setCurrentPage() {
    return {
        type: SET_CURRENT_PAGE
    }
}

function setTableSize() {
    return {
        type: SET_TABLE_SIZE
    }
}