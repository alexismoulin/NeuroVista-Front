export default function PillButton({children, ...props}) {
    return (
        <button
            className="px-4 py-2 text-white uppercase font-bold font-opensans text-base border-white border-2 rounded-full w-44 
            hover:text-tahiti hover:border-tahiti transition-colors duration-200 ease-in-out
            disabled:border-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed"
            {...props}
        >
            {children}
        </button>
    )
}