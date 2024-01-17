import Message from "../models/secretMessage.js";

export const getMessages = async (req, res) => {
  try {
    const secrets = await Message.find();
    res.status(200).json(secrets);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const createSecret = async (req, res) => {
  const secretmessage = req.body;
  try {
    const existingSecret = await Message.findOne({ creator: req.userId });
    if (existingSecret)
      return res.json({ message: "you have already posted a secret" });
    const newMessage = await Message.create({
      ...secretmessage,
      creator: req.userId,
    });
    console.log(newMessage);
    res.status(200).json(secretmessage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something unexpected happend" });
  }
};

export const updateSecret = async (req, res) => {
  const _id = req.params.id;
  const post = req.body;
  try {
    const updatedPost = await Message.findByIdAndUpdate(_id, post, {
      new: true,
    });
    res.json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: `something went wrong` });
  }
};
