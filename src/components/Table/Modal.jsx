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
            <div id="main">
            <section>
            <h2>Structure Analyzed: {structureName}</h2>
            </section>
            <section>
            <h3>Key Metrics</h3>
            <ul>
                {zippedValues.map((el, index) => <li key={index}>{el.join(': ')}</li>)}
            </ul>
            </section>
            <section>
                <h3>Analysis</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
            </section>
            <section>
            <button onClick={close}>Close</button>
            </section>
            </div>
        </dialog>,
        document.getElementById('modal')
    )
}