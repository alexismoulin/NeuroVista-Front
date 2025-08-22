export default function PillButton({selected, children, ...props}) {

    let cssClasses = "px-4 py-2 uppercase font-bold font-opensans text-base border-white border-2 rounded-full w-44 \
    hover:text-tahiti hover:border-tahiti transition-colors duration-200 ease-in-out \
    disabled:border-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed";

    if (selected) {
        cssClasses += " text-tahiti bg-white"
    } else {
        cssClasses += " text-white"
    }

    return (
        <button
            className={cssClasses}
            {...props}
        >
            {children}
        </button>
    )
}