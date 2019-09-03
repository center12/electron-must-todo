const state = {
    show_dialog: false
}

const mutations = {
    OPEN_DIALOG(state) {
        state.show_dialog = true
    },
    CLOSE_DIALOG(state) {
        state.show_dialog = false
    },
    TOGGLE_DIALOG(state) {
        state.show_dialog = !state.show_dialog
    }
}

const actions = {

    toggleTaskModal({commit}) {
        commit('TOGGLE_DIALOG')
    },
    closeTaskModal({commit}) {
        commit('CLOSE_DIALOG')
    },
}

export default {
    namespace: true,
    state,
    mutations,
    actions
}