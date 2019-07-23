export interface QR {
    value: string;
}

export const SET = "SET_QR";

export interface SetQRAction {
    type: typeof SET;
    value: string;
}

export type QRActionTypes = | SetQRAction;

export const setQR = (value: string): QRActionTypes => ({
    type: SET,
    value
});

const qrReducerDefaultState: QR = {value: ''};

export const reducer = (state = qrReducerDefaultState, action: QRActionTypes): QR => {
    switch(action.type){
        case SET:
            console.log('SET : ', action.value);
            return {value: action.value};
        default:
            return state;
    }
}