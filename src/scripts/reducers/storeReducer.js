const reduceFunction = (state, action) => {
    switch (action.type) {
        case 'SET_PRODUCT':
            return { ...state, products: action.products };
        case 'SET_FILTERED_PRODUCT':
            return { ...state, filteredProduct: action.filteredProduct };
        case 'SET_TABLE_VIEW_PRODUCT':
            return { ...state, tableViewProducts: action.tableViewProducts };
        case 'SET_HEADER':
            return { ...state, header: action.header };
        case 'SET_SHOW_TABLE':
            return { ...state, showTable: action.showTable };
        case 'SET_EDIT_TABLE':
            return { ...state, editTable: action.editTable };
        case 'SET_SELECTED_PRODUCT':
            return { ...state, selectedProduct: action.selectedProduct };
        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.currentPage };
        case 'SET_TABLE_SIZE':
            return { ...state, tableSize: action.tableSize };
        case 'default':
            return state;
    }
}

export default reduceFunction;