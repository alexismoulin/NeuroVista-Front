import ReactMarkdown from "react-markdown";

export default function MarkdownRenderer({ markdown }) {
    return (
        <div className="prose max-w-none">
            <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
    );
};
