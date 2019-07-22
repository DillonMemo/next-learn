import React, { useState, useCallback } from 'react';

import Header from './Header';

export const useInput = (initValue:string | string[] = '') => {
    const [value, setter] = useState(initValue);

    const handler = useCallback((e) => {
        setter(e.target.value);
    }, []);

    return [value, handler];
}

const BodyMaster = ({ children, onChangeIsSummary }) => {
    return (
        <div className="template-body">
            <div className="body-inner">
                <Header onChangeIsSummary={onChangeIsSummary} />
            </div>
            <div className="content" style={{ padding: '30px' }}>
                { children }
            </div>
        </div>
    );
};

export default BodyMaster;