import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector, useAction } from 'react-redux';

// Set Types
type FormElem = React.FormEvent<HTMLFormElement>
type ChangeElem = React.ChangeEvent<HTMLInputElement>

const Index: React.FunctionComponent = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const typingSpeed = 150;
    const qr = useSelector(state => state.qr);

    const handleType = () => {
        const dataText = ['YapTV public document...', '클라이언트 개발 환경 : React '];
        const i = loopNum % dataText.length;
        if (isDeleting) {
            setText(dataText[i].substring(0, text.length - 1));
        } else {
            setText(dataText[i].substring(0, text.length + 1));
        }

        if (!isDeleting && text === dataText[i]) {
            setIsDeleting(true);
        } else if (isDeleting && text === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            console.log(loopNum);
        }

    };

    useEffect(() => {
        setTimeout(handleType, typingSpeed);
    });

    const test = ():JSX.Element => {
        if(qr.value !== ""){
            return (<p>QR Result : {qr.value}</p>);
        }
    }
    return (
        <>
            <h2 className="ityped" style={{ display: 'inline-block' }}>{text}</h2>
			<span id="cursor"></span>

            { test() }
        </>
    );
};

export default Index