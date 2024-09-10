import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({open, close, item, headers}) {
    const dialog = useRef()

    useEffect(() => {
        if (open) {
            dialog.current.showModal()
        } else {
            dialog.current.close()
        }
    }, [open])

    function zipArrays(arr1, arr2) {
        return arr1.map((element, index) => [element, arr2[index]])
    }

    let zippedValues = zipArrays(headers, Object.values(item)).slice(0, -1)
    let structureName = zippedValues.shift()[1]

    return createPortal(
        <dialog ref={dialog}>
            <h3>Structure Analyzed: {structureName}</h3>
            <ul>
                {zippedValues.map((el, index) => <li key={index}>{el.join(': ')}</li>)}
            </ul>
            <button onClick={close}>Close</button>
        </dialog>,
        document.getElementById('modal')
    )
}