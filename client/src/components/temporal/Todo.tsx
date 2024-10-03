import { FC } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

interface PROPS {
  todo: Todo;
}

const TodoC: FC<PROPS> = ({ todo }) => {
  const { id, title, completed } = todo;
  const h4 = <h4>{title}</h4>;
  const text = completed ? <i>{h4}</i> : h4;
  
  return <li>{text}</li>;
};

export default TodoC;
