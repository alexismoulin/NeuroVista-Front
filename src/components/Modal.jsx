import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({open, close, item }) {
    const dialog = useRef()

    useEffect(() => {
        if (open) {
            dialog.current.showModal();
        } else {
            dialog.current.close();
        }
    }, [open])


    return createPortal(
        <dialog ref={dialog}>
            <h2>Coucou</h2>
            <button onClick={close}>Close</button>
        </dialog>,
        document.getElementById('modal')
    )
}