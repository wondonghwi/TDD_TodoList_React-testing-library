import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import TodoForm from './TodoForm';

describe('<TodoForm />', () => {
  const setup = (props = {}) => {
    const utils = render(<TodoForm {...props} />);
    const { getByText, getByPlaceholderText } = utils;
    const input = getByPlaceholderText('할 일을 입력하세요');
    const button = getByText('등록');
    return {
      ...utils,
      input,
      button,
    };
  };
  test('has input and a button', () => {
    const { input, button } = setup();
    expect(input).toBeTruthy();
    expect(button).toBeTruthy();
  });

  test('changes input', () => {
    const { input } = setup();
    fireEvent.change(input, {
      target: {
        value: 'TDD 배우기',
      },
    });
    // toHaveAttribute는 해당 DOM 에 특정 속성이 있는지 확인해줍니다.
    expect(input).toHaveAttribute('value', 'TDD 배우기');
  });

  test('calls onInsert and clears input', () => {
    const onInsert = jest.fn(); //jest 에서 제공하는 mock 함수
    const { input, button } = setup({ onInsert }); // props 가 필요 할땐 이렇게 직접 파라미터로 전달
    fireEvent.change(input, {
      target: {
        value: 'TDD 배우기',
      },
    });
    fireEvent.click(button);
    expect(onInsert).toBeCalledWith('TDD 배우기'); // onInsert 가 'TDD 배우기' 파라미터가 호출됐어야함
    expect(input).toHaveAttribute('value', ''); // input이 비워져야함
  });
});
