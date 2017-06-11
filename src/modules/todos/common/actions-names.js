import {nameSpace} from  '../config';

const symbols = [
    'add',
    'remove',
    'toggle',
].reduce((acc, eventName) => ({
    ...acc,
    [`${nameSpace}__${eventName}`]: acc[eventName] ? duplicateEventNameError(eventName) : Symbol.for(eventName)
}), {});

function duplicateEventNameError (eventName) {
    throw new Error(`Event ${eventName} already exists`);
}

export default symbols;

