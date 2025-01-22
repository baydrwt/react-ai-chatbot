/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef } from "react";
import Markdown from "react-markdown";
import styles from "./Chat.module.css";

const WELCOME_MESSAGE_GROUPS = [
  {
    role: "assistant",
    content: "Halo! How can I help you today?",
  },
];
// eslint-disable-next-line react/prop-types
export default function Chat({ messages }) {
  const messagesEndRef = useRef(null);
  const messagesGroup = useMemo(
    () =>
      messages.reduce((groups, message) => {
        if (message.role === "user") groups.push([]);
        groups[groups.length - 1].push(message);
        return groups;
      }, []),
    [messages]
  );

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === "user") {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <div className={styles.Chat}>
      {/* Group */}
      {[WELCOME_MESSAGE_GROUPS, ...messagesGroup].map((messages, groupIndex) => (
        <div key={groupIndex} className={styles.Group}>
          {/* Message */}
          {messages.map(({ role, content }, index) => (
            <div key={index} className={styles.Message} data-role={role}>
              <Markdown>{content}</Markdown>
            </div>
          ))}
        </div>
      ))}

      <div ref={messagesEndRef} />
    </div>
  );
}
