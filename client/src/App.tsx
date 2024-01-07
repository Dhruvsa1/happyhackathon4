import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "./api/axios";

import Loading from "./components/Loading";

function App() {
  const [currPrompt, setCurrPrompt] = useState("");
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
      .then(() => {
        get();
        setLoading(false);
      });
  };

  return (
    <div className="w-auto h-screen grid place-items-center bg-white grid-rows-[5%_95%] ">
      <div className="w-full text-[50pt] text-blue-800 grid place-items-center font-primary">
        {" "}
        <p className="mt-[8%]">TheraBot</p>
      </div>
      <div className="w-[80%] h-[80%] grid  place-items-center bg-white max-h-[1000px]">
        <div className=" w-[90%] h-[80%] grid place-items-center grid-row-[80%_20%] bg-gray-200 rounded-lg p-5  overflow-x-hidden">
          <div className="w-full h-full min-h-[350px] overflow-scroll overflow-x-hidden">
            {messages.length == 0 ? (
              <p>start prompting</p>
            ) : (
              <motion.div className="content-center overflow-hidden">
                <AnimatePresence>
                  {messages.messages.map((p: any) => {
                    return (
                      <motion.p
                        className="w-full bg-white rounded p-4 mb-5"
                        key={p._id}
                      >
                        <strong>
                          {p["role"] === "assistant" || p["role"] === "system"
                            ? "TheraBot:"
                            : "User:"}
                        </strong>{" "}
                        {p["content"]}
                      </motion.p>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
          <div className="w-0 h-0 bg-transparent" />
          <div className=" rounded-lg w-[90%] h-[70%] mt-[10px] min-h-[50px]  self-start grid grid-cols-[90%_10%] shadow-2xl shadow-black place-items-center">
            <input
              type="text"
              placeholder="You can talk to me about anything... you're in a safe place"
              className="   placeholder:text-gray-500 w-full h-full  bg-gray-200 rounded-r-none rounded-l-lg  p-3 bg-transparent"
              name="prompt"
              id="prompt"
              onChange={(e: any) => setCurrPrompt(e.target.value)}
              value={currPrompt}
            ></input>
            <div className="w-full h-full grid place-items-center  bg-gray-200 rounded-l-none rounded-r-lg bg-transparent rounded-lg ">
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
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 1.2 }}
                    exit={{ scale: 0 }}
                    //#686DFC
                    className="bg-blue-800 w-[40%] h-[40%]  rounded-full transition-all duration-500 "
                  ></motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
