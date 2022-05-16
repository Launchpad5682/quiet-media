import styles from "./Modal.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import { TextBox } from "../../molecules/TextBox/TextBox";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearModal } from "./ModalSlice";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { doc, getDoc } from "firebase/firestore";
import { firestoreDB } from "../../../firebase";

export const Modal = () => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const closeHandler = () => dispatch(clearModal());
  useOnClickOutside(modalRef, closeHandler);
  const { edit, type, _id } = useSelector((store) => store.modal);
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (_id) {
      (async () => {
        const docRef = doc(firestoreDB, "posts", _id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost({ ...docSnap.data() });
        }
      })();
    }
  }, [_id]);

  return (
    <div className={styles.modal__container}>
      <div className={styles.modal__background}></div>
      <div className={styles.modal} ref={modalRef}>
        <AiOutlineClose className={styles.close} onClick={closeHandler} />
        {type === "post" ? (
          <TextBox
            closeHandler={closeHandler}
            post={post}
            edit={edit}
            _id={_id}
          />
        ) : (
          <>User Profile Form</>
        )}
      </div>
    </div>
  );
};
