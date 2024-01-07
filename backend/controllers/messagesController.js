const OpenAI = require("openai");
const openai = new OpenAI();


async function botResponse(messages) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });

    return {
      role: "assistant",
      content: completion.choices[0].message.content,
    };
  } catch (error) {
    console.error("Error sending message to OpenAI:", error);
    throw error;
  }
}

const Messages = require("../model/Messages");

const post = async (req, res) => {
  const newMessages = new Messages(req.body);
  const saveMessages = newMessages.save();
  if (saveMessages) res.send("Publication saved!");
  res.end();
};

const handlePrompt = async (req, res) => {
  try {
    const get = await Messages.find({});
    let messages = get[0];
    const messagesID = req.params.id;
    const prompt = req.body.prompt;
    messages["messages"].push({ role: "user", content: prompt });

    try {
      // const messages = await Messages.find({}, { _id: 0 });

      let xMessages = messages["messages"];
      xMessages = xMessages.map((message) => {
        const { _id, ...rest } = message.toObject(); // Convert to plain object and destructure to exclude _id
        return rest;
      });
      const response = await botResponse(xMessages);
      xMessages.push(response);
      messages["messages"] = xMessages;
      const saveMessages = await Messages.updateOne(
        { _id: messagesID },
        messages
      );

      res.send(response);
    } catch (err) {
      console.log(err);
      // res.status(500).send("Trouble fetching the messages...");
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const get = async (req, res) => {
  try {
    const messages = await Messages.find({});
    return res.json(messages);
  } catch (err) {
    res.status(500).send("Trouble fetching the messages...");
  }
};

module.exports = {
  post,
  get,
  handlePrompt,
};
