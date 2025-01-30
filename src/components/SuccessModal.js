import ReactModal from "react-modal";
import { AiOutlineClose } from "react-icons/ai"
import Lottie from "lottie-react"
import Success from "../assets/Success.json"

const SuccessModal = ({
    isSuccessModalOpen,
    closeSuccessModal,
    message
}) => {
    const modalLottieStyle = {
        width: "20%",
        margin: "0 auto"
    }
    return (
        <ReactModal
            isOpen={isSuccessModalOpen}
            onRequestClose={closeSuccessModal}
            className="modal_delete"
            overlayClassName="modal_overlay"
            ariaHideApp={false}
        >
            <button type="button"
                onClick={closeSuccessModal}
                className='modal_closeIcon'>
                <AiOutlineClose />
            </button>
            <div>
                <Lottie animationData={Success} style={modalLottieStyle} />
                <span>{message}</span>
            </div>
            <div className="home_modalActions">
                <button onClick={closeSuccessModal} className="modal_cancelButton">Close</button>
            </div>
        </ReactModal>
    )
}

export default SuccessModal