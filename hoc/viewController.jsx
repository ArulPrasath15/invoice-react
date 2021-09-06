import { useEffect, useState } from "react";
import {connect} from "react-redux";

const Controller = (WrappedComponent) => {
    // eslint-disable-next-line react/display-name
    return (props)=>{
        console.log(document.cookie)
        return <WrappedComponent {...props} />;
    }
}
const mapStateToProps = (state) => ({
    user: state.userStore.user,
})

const mapDispatchToProps = { }


export default (Controller);