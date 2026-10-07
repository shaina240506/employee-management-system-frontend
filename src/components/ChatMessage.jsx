import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bot, User, Copy } from "lucide-react";
import { toast } from "react-toastify";

function ChatMessage({ sender, text }) {

    const isUser = sender === "user";

    const copyText = () => {
        navigator.clipboard.writeText(text);
        toast.success("Copied");
    };

    return (

        <div
            className={`flex mb-5 ${
                isUser ? "justify-end" : "justify-start"
            }`}
        >

            {

                !isUser && (

                    <div
                        className="
                        w-10
                        h-10
                        rounded-full
                        bg-gradient-to-r
                        from-purple-600
                        to-indigo-600
                        text-white
                        flex
                        items-center
                        justify-center
                        mr-3
                        flex-shrink-0
                        shadow-md"
                    >

                        <Bot size={18} />

                    </div>

                )

            }

            <div className="max-w-[80%]">

                <div

                    className={`
                    rounded-2xl
                    px-4
                    py-3
                    shadow-sm
                    border
                    leading-7
                    break-words
                    overflow-hidden

                    ${
                        isUser
                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-transparent rounded-br-md"
                            : "bg-white border-slate-200 text-gray-800 rounded-bl-md"
                    }

                    `}

                >

                    {

                        isUser

                            ?

                            <p className="whitespace-pre-wrap">{text}</p>

                            :

                            <div className="prose prose-sm max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-1">

                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                >
                                    {text}
                                </ReactMarkdown>

                            </div>

                    }

                </div>

                {

                    !isUser && (

                        <button

                            onClick={copyText}

                            className="
                            mt-2
                            flex
                            items-center
                            gap-1
                            text-xs
                            text-gray-500
                            hover:text-purple-600
                            transition"

                        >

                            <Copy size={13} />

                            Copy

                        </button>

                    )

                }

            </div>

            {

                isUser && (

                    <div
                        className="
                        w-10
                        h-10
                        rounded-full
                        bg-purple-100
                        text-purple-700
                        flex
                        items-center
                        justify-center
                        ml-3
                        flex-shrink-0"
                    >

                        <User size={18} />

                    </div>

                )

            }

        </div>

    );

}

export default ChatMessage;