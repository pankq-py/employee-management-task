import ReactModal from "react-modal";
import { AiOutlineClose } from "react-icons/ai"
import Lottie from "lottie-react"
import Error from "../assets/Error.json"

const WarningModal = ({
    isWarningModalOpen,
    closeWarningModal,
    error
}) => {
    const modalLottieStyle = {
        width: "20%",
        margin: "0 auto"
    }
    return (
        <ReactModal
            isOpen={isWarningModalOpen}
            onRequestClose={closeWarningModal}
            className="modal_delete"
            overlayClassName="modal_overlay"
            ariaHideApp={false}
        >
            <button type="button"
                onClick={closeWarningModal}
                className='modal_closeIcon'>
                <AiOutlineClose />
            </button>
            <div>
                <Lottie animationData={Error} style={modalLottieStyle} />
                <span>{error}</span>
            </div>
            <div className="home_modalActions">
                <button onClick={closeWarningModal} className="modal_cancelButton">Close</button>
            </div>
        </ReactModal>
    )
}

export default WarningModal