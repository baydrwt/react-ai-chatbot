/* eslint-disable no-unused-vars */
import { useState } from "react";

import styles from "./App.module.css";
import Chat from "./components/Chat/Chat";
import Controls from "./components/Controls/Controls";
import { Assistant, test } from "./assistants/googleai";
import { Loader } from "./components/Loader/Loader";
// import { Assistant } from "./assistants/openai";

function App() {
  const assistant = new Assistant();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  console.log(test);

  function updateLastMessageContent(content) {
    setMessages((prevMessages) => prevMessages.map((messsage, index) => (index === prevMessages.length - 1 ? { ...messsage, content: `${messsage.content}${content}` } : messsage)));
  }

  async function handleContentSend(content) {
    addMessage({ content, role: "user" });
    setIsLoading(true);
    try {
      //Gemini
      const result = await assistant.chatStream(content);
      let isFirstChunk = false;
      for await (const chunk of result) {
        if (!isFirstChunk) {
          isFirstChunk = true;
          addMessage({ content: "", role: "assistant" });
          setIsLoading(false);
          setIsStreaming(true);
        }

        updateLastMessageContent(chunk);
      }
      setIsStreaming(false);

      //OpenAI
      // const result = await assistant.chat(content, messages);
    } catch (error) {
      addMessage({ role: "system", content: "Sorry, i can't process your request. Try again later" });
      setIsLoading(false);
      setIsStreaming(false);
    }
  }
  return (
    <div className={styles.App}>
      {isLoading && <Loader />}
      <header className={styles.Header}>
        <img className={styles.Logo} src="/chat-bot.png" alt="" />
        <h2 className={styles.Title}>AI Chatbot</h2>
      </header>
      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>
      <Controls isDisabled={isLoading || isStreaming} onSend={handleContentSend} />
    </div>
  );
}

export default App;
