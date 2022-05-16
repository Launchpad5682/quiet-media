import styles from "./Modal.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import { TextBox } from "../../molecules/TextBox/TextBox";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearModal } from "./ModalSlice";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

export const Modal = () => {
  const modal = useSelector((store) => store.modal);
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const closeHandler = () => dispatch(clearModal());
  useOnClickOutside(modalRef, closeHandler);

  return (
    <div className={styles.modal__container}>
      <div className={styles.modal__background}></div>
      <div className={styles.modal} ref={modalRef}>
        <AiOutlineClose className={styles.close} onClick={closeHandler} />
        {modal.type === "post" ? (
          <TextBox closeHandler={closeHandler} />
        ) : (
          <>User Profile Form</>
        )}
      </div>
    </div>
  );
};
