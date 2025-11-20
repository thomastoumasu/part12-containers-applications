import { useState, useImperativeHandle, forwardRef, Ref } from 'react';
import { EntryFormRef } from '../../types';

interface TogglableProps {
  buttonLabel: string;
  children: React.ReactNode
}

const Togglable = forwardRef((props: TogglableProps, ref: Ref<EntryFormRef>) => {

  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

export default Togglable;

// https://stackoverflow.com/questions/60554808/react-useref-with-typescript-and-functional-component
// need forwardRef here (contrary to in BlogList where it wasnt necessary) probably because react version < 19