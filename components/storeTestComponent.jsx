/*
* @created: 01/08/2021 - 12:53 PM
* @author: Abi
* @description: ----------------
*/
import React from 'react'
import {connect} from 'react-redux'

const storeTestComponent = ({counted}) => {
    return(
        <div>
            <h1>Store from Another Component</h1>
            <h2>Counter Reactive: {counted}</h2>
            <hr/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    counted: state.count.count
})


export default connect(mapStateToProps)(storeTestComponent)