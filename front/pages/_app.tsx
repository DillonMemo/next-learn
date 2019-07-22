import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import withRedux from 'next-redux-wrapper';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import BodyMaster from '../components/body/BodyMaster';
import reducer from '../reducers';

import '../assets/sass/normalize.scss';

const App = ({ Component, store }) => {
    const [isSummary, setIsSummary] = useState<boolean>(true);

    const onChangeIsSummary = () => {
        setIsSummary(!isSummary);
    }

    const getToggleSummaryClass = () => {
        let elementClasses = ['template'];

        if (isSummary === true) {
            elementClasses.push('with-summary');
        }

        return elementClasses.join(' ');
    }

    return (
        <Provider store={store}>
            <Head>
                <title>YapTV</title>
                <link rel="stylesheet" href="" />
            </Head>
            <div className={getToggleSummaryClass()}>
                <div className="template-summary">
                    <nav>
                        <ul className="summary">
                            <li className="divider"></li>
                            <li className="chapter">
                                <Link href="/index"><a>소개</a></Link>
                                <ul className="articles">
                                    <li className="chapter">
                                        <Link href="/Board"><a>게시판</a></Link>
                                    </li>
                                    <li className="chapter">
                                        <Link href="/todo"><a>To Do</a></Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="divider"></li>
                        </ul>
                    </nav>
                </div>
                <BodyMaster
                    onChangeIsSummary={ onChangeIsSummary }
                >
                    <Component />
                </BodyMaster>
            </div>
        </Provider>
    );
};

export default withRedux(() => {
    const middlewares = [];
    const enhancer = process.env.NODE_ENV === 'development'
        ? composeWithDevTools(applyMiddleware(...middlewares))
        : compose(applyMiddleware(...middlewares));

    const store = createStore(reducer, enhancer);

    return store;
})(App);