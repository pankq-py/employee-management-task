import React from 'react'
import ReactModal from 'react-modal'
import Lottie from "lottie-react";
import Loader from "../assets/loader.json"

const CustomLoader = ({ isLoading }) => {
    const Loaderstyle = {
        width: "40%",
        margin: "0 auto"
    }
    
    return (
        <ReactModal
            isOpen={isLoading}
            className="LoaderModal"
            overlayClassName="modal_overlay"
            ariaHideApp={false}
            shouldCloseOnOverlayClick={false}
        >
            <Lottie animationData={Loader} style={Loaderstyle} />
        </ReactModal>
    )
}
export default CustomLoader;