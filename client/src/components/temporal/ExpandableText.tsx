import { FC, useState } from "react";

type PROPS = {
  text: string;
};

const ExpandableText: FC<PROPS> = ({ text }) => {
  const limit = 255;
  const [isExpanded, setIsExpanded] = useState(false);

  if (text.length <= limit) return <article>{text}</article>;
  const content = isExpanded ? text : `${text.substring(0, limit)}...`;

  return (
    <div>
      <article>{content}</article>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? "Show less" : "Show more"}
      </button>
    </div>
  );
};

export default ExpandableText;
