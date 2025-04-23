export default function PrimaryButton({children, ...props}) {
    return (
        <button
            className="font-opensans uppercase text-white py-3 px-6 text-center bg-slatey text-sm tracking-widest hover:bg-tahiti transition-colors duration-200 ease-in-out"
            {...props}>{children}</button>
    )
}