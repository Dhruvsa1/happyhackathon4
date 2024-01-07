import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import axios from "./api/axios";
import ScrollToBottom from "./components/ScrollToBottom";
import Loading from "./components/Loading";

function App() {
  const [currPrompt, setCurrPrompt] = useState("");
  const [currResponse, setCurrResponse] = useState();
  const [messages, setMessages] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // const handlePost = () => {
  //   axios
  //     .post("/messages", {
  //       messages: [{ role: "system", content: "You are an assisstant" }],
  //     })
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // };

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    await axios
      .get("/messages")
      .then((res) => setMessages(res.data[0]))
      .catch((err) => console.log(err));
  };

  const handlePrompt = async () => {
    setLoading(true);
    await axios
      .patch("/messages/" + messages._id, {
        prompt: currPrompt,
      })
      .then(async (res) => {
        setCurrResponse(res.data);
        get();
        setLoading(false);
      });
  };

  return (
    <div className="w-auto h-screen grid place-items-center ">
      <div className="w-[80%] h-[80%] grid grid-rows-[80%_20%] place-items-center bg-blue-400 max-h-[1000px]">
        <div className=" w-[90%] h-[80%] bg-blue-200 rounded-lg p-5 flex flex-col  overflow-scroll overflow-x-hidden">
          {messages.length == 0 ? (
            <p>start prompting</p>
          ) : (
            <motion.div className="content-center">
              <AnimatePresence>
                {messages.messages.map((p: any) => {
                  return (
                    <motion.p
                      className="w-full bg-white rounded p-4 mb-5"
                      key={p._id}
                    >
                      {p["role"] === "assistant" || p["role"] === "system"
                        ? "Assistant:"
                        : "User:"}{" "}
                      {p["content"]}
                    </motion.p>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
          <div className="w-0 h-0 bg-transparent" />
        </div>
        <div className=" w-[90%] h-[70%] self-start grid grid-cols-[10%_90%]">
          <div className="w-full h-[50%] grid place-items-center border-r-2 border-y-0 border-l-0 border-blue-400 bg-blue-200 rounded-lg ">
            <AnimatePresence>
              {loading ? (
                <Loading />
              ) : (
                <motion.button
                  onClick={async () => {
                    setMessages({
                      _id: messages["_id"],
                      messages: [
                        ...messages["messages"],
                        { role: "user", content: currPrompt },
                      ],
                    });
                    handlePrompt();
                    setCurrPrompt("");
                  }}
                  initial={{ scale: 1, backgroundColor: "#68a4fc" }}
                  whileHover={{ scale: 1.2, backgroundColor: "#68a4fc" }}
                  whileTap={{ scale: 1.2, backgroundColor: "#686DFC" }}
                  exit={{ scale: 0, backgroundColor: "#68a4fc" }}
                  //#686DFC
                  className="bg-blue-400 w-[40%] h-[40%] rounded-full transition-all duration-500 "
                ></motion.button>
              )}
            </AnimatePresence>
          </div>
          <textarea
            className="w-full h-[50%] bg-blue-200 rounded-l rounded-lg p-3 "
            name="prompt"
            id="prompt"
            onChange={(e: any) => setCurrPrompt(e.target.value)}
            value={currPrompt}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default App;
