export const setSource = (source) => ({
    type: 'SET_SOURCE',
    service: source
});

export const setDestination = (destination) => ({
    type: 'SET_DESTINATION',
    service: destination
});

export const setTransferData = (transferData) => ({
    type: 'SET_TRANSFER_DATA',
    data: transferData
});

