const DEBUG = (process && process.env && process.env.debug === true)
const PROD = (process && process.env && process.env.prod === true)
const TEST = (process && process.env && process.env.NODE_ENV === 'test');

const isOnForTest_reduxLogger = false;
const shouldPersistStoreState = false;

export {
    DEBUG,
    PROD,
    TEST,
    isOnForTest_reduxLogger,
    shouldPersistStoreState
};
