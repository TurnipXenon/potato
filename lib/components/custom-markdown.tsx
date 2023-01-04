import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw';

export interface CustomMarkdownProps {
    children: any;
}

export const CustomMarkdown = (props: CustomMarkdownProps) => {
    return <ReactMarkdown rehypePlugins={[rehypeRaw]}>
        {props.children}
    </ReactMarkdown>;
};