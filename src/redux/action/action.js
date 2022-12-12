export const todoAction = (todoItem) => {
    return {
        type: 'ADD_TODO',
        payload: {
            ...todoItem
        }
    }
}

export const deleteTodo = (id) => {
    return {
        type: 'DELETE_TODO',
        payload: {
            id:id
        }
    }
}


export const isChecked = (todoItem) => {
    return {
        type: 'CHECKED_ITEM',
        payload: {
            ...todoItem
        }
    }
}

export const saveAllTodos = (todos) => {
    return {
        type: 'SAVE_ALL',
        payload: todos
    }
}

export const deleteAll = (todos) => {
    return {
        type: 'DELETE_ALL',
        payload: todos
    }
}

export const editTodo = (todoItem) => {
    return {
        type: 'EDIT_TODO',
        payload: {
            ...todoItem
        }
    }
}