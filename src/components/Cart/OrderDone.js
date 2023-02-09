import Modal from "../UI/Modal";

const OrderDone=({onClose,status})=>{

    return(
        <Modal onClose={onClose}>
            <div className={"order-container"}>
                <div className={"order-container--success"}>
                    <img src="" alt="Success" className="img-fluid"/>
                    <div className="message">
                        <h1>{status}</h1>
                        <span>Order ID:#{Math.random().toString()}</span>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default OrderDone;