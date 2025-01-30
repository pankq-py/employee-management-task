import ReactModal from "react-modal";
import { AiOutlineClose } from "react-icons/ai"
import Lottie from "lottie-react"
import Delete from "../assets/Delete.json"

const ConfirmationModal = ({
    isModalOpen,
    closeDeleteModal,
    handleDelete
}) => {
    const modalLottieStyle = {
        width: "20%",
        margin: "0 auto"
    }
    return (
        <ReactModal
            isOpen={isModalOpen}
            onRequestClose={closeDeleteModal}
            className="modal_delete"
            overlayClassName="modal_overlay"
            ariaHideApp={false}
        >
            <button type="button"
                onClick={closeDeleteModal}
                className='modal_closeIcon'>
                <AiOutlineClose />
            </button>
            <div>
                <Lottie animationData={Delete} style={modalLottieStyle} />
                <span>
                    Are you sure you want to delete?
                </span>
            </div>
            <div className="home_modalActions">
                <button onClick={handleDelete} className="modal_confirmButton">Yes</button>
                <button onClick={closeDeleteModal} className="modal_cancelButton">No</button>
            </div>
        </ReactModal>
    )
}

export default ConfirmationModal