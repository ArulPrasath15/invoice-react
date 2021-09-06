import React from 'react';
import Controller from "../hoc/viewController";

function Private(props) {
    return (
        <div>
            This  is my protected page
        </div>
    );
}

export default Controller(Private);