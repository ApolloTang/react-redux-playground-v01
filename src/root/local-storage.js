import store from './store';

const PERSISED_STATE_NAME = 'store';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem(PERSISED_STATE_NAME);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        // Browsers security might not allow you to use local storage.
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(PERSISED_STATE_NAME, serializedState);
    } catch (err) {
        // Ignore write errors.
    }
};

export {saveState, loadState};
