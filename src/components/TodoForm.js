import React, { useCallback, useState } from 'react';

const TodoForm = ({ onInsert }) => {
  const [value, setValue] = useState('');

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      onInsert(value);
      setValue('');
    },
    [onInsert, value]
  );

  const onChange = useCallback(e => {
    setValue(e.target.value);
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={value} onChange={onChange} placeholder="할 일을 입력하세요" />
      <button type="submit">등록</button>
    </form>
  );
};

export default TodoForm;
