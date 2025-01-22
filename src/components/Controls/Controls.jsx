/* eslint-disable react/prop-types */
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./Controls.module.css";

export default function Controls({ isDisabled = false, onSend }) {
  const [content, setContent] = useState("");

  function handleContentChange(event) {
    setContent(event.target.value);
  }

  function handleContentSend() {
    if (content.length > 0) {
      onSend(content);
      setContent("");
    }
  }

  function handleEnterPress(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleContentSend();
    }
  }

  return (
    <div className={styles.Controls}>
      <div className={styles.TextAreaContainer}>
        <TextareaAutosize placeholder="Message AI Chatbot" className={styles.TextArea} minRows={1} maxRows={4} onChange={handleContentChange} onKeyDown={handleEnterPress} value={content} disabled={isDisabled}></TextareaAutosize>
      </div>
      <button className={styles.Button} onClick={handleContentSend} disabled={isDisabled}>
        <SendIcon />
      </button>
    </div>
  );
}

function SendIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
      <path d="M120-160v-240l320-80-320-80v-240l760 320-760 320Z" />
    </svg>
  );
}
