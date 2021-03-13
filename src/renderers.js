import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import dark from "react-syntax-highlighter/dist/cjs/styles/prism/dracula";

import "./renderers.styles.css";

const renderers = {
    code: ({ language, value }) => {
    return (
      <SyntaxHighlighter style={dark} language={language} children={value} />
    );
  },

  link: ({href, children}) => {
  	return(
  		<a className="a" href={href} target="_blank">{children}</a>
  		)
  },
  inlineCode: ({value}) => {
  	return(
  	<span className="span">{value}</span>
  	)
  },

  heading: ({ level, children }) => {
    switch (level) {
      case 1:
        return <h2 className="h2-lg">{children}</h2>
      case 2:
        return <h2 className="h2-md">{children}</h2>
      case 3:
        return <h3 className="h3">{children}</h3>
      default:
        return children;
    }
  },
}

export default renderers;