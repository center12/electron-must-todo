

const state = {
    show_dialog: false,
    current_data_edit: {},
    refresh_todo: Date.now()
}

const mutations = {
    OPEN_DIALOG(state) {
        state.show_dialog = true
    },
    CLOSE_DIALOG(state) {
        state.show_dialog = false
    },
    TOGGLE_DIALOG(state, data) {
        state.current_data_edit = typeof data != 'undefined' ? data : {}
        state.show_dialog = !state.show_dialog
    },
    REFRESH_TODO(state) {
        state.refresh_todo = Date.now()
    }   
}

const actions = {

    toggleTaskModal({commit}, data) {
        commit('TOGGLE_DIALOG', data)
    },
    closeTaskModal({commit}) {
        commit('CLOSE_DIALOG')
    },
    refreshTodo({commit}) {
        commit('REFRESH_TODO')
    },
}

export default {
    namespace: true,
    state,
    mutations,
    actions
}