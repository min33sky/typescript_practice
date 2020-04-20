import React, { memo } from 'react';
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import './TodoListItem.scss';
import cn from 'classnames';
import { Todo } from './TodoList';

type TodoListItemProps = {
  todo: Todo;
  onRemove: (id: number) => () => void;
  onToggle: (id: number) => () => void;
  style?: React.CSSProperties | undefined;
};

function TodoListItem({ todo, onRemove, onToggle, style }: TodoListItemProps) {
  const { id, text, checked } = todo;

  return (
    <div className="TodoListItem-virtualized" style={style}>
      <div className="TodoListItem">
        <div className={cn('checkbox', { checked })} onClick={onToggle(id)}>
          {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          <div className="text">{text}</div>
        </div>
        <div className="remove" onClick={onRemove(id)}>
          <MdRemoveCircleOutline />
        </div>
      </div>
    </div>
  );
}

// ! memo를 적용하면 todo, onRemove, onToggle이 바뀌지 않는 한 리랜저링 되지 않는다.
export default memo(
  TodoListItem,
  (prevProps, nextProps) => prevProps.todo === nextProps.todo,
);
