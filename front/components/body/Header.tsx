import React from 'react';

const Header = ({ onChangeIsSummary }) => {
    return (
        <div className="template-header">
            <div className="box pull-left js-toolbar-action" onClick={onChangeIsSummary}>
                <div className="bars">
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>
            <div className="box pull-left font-settings js-toolbar-action">
                <div>
                    <i className="fa fa-cog"></i>
                </div>
            </div>
        </div>
    );
};

export default Header;