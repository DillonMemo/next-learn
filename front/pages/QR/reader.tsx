import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QrReader from 'react-qr-reader';
import Router from 'next/router';

import { QRActionTypes, SET } from '../../reducers/reader';

const reader = () => {
    const dispatch = useDispatch<QRActionTypes>();
    const [isQR, setIsQR] = useState(false);
    const handleClick = () => {
        document.querySelector('.template').classList.remove('with-summary');
        setIsQR(!isQR);
    }
    const handleError = err => {
        console.log(err);
    }
    const handleScan = data => {
        if(data){
            dispatch({
                type: SET,
                value: data    
            });
            setIsQR(!isQR);
            Router.push('/');
        }
    }
    return (
        <>
            <button onClick={handleClick}>Click</button>
            {
                isQR 
                ? <QrReader
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '100%', margin: '0 auto' }}
                />
                : <p>버튼을 클릭 하시면 카메라가 열립니다.</p>
                
            }
        </>
    );
};

export default reader;