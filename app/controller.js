import Task from "./model.js";

export const taskCreate = async (req, res) => {
  try {
    const { task } = await req.body;
    console.log(task);

    if (!task) {
      return res.status(400).json({ message: "Task text is required" });
    }

    const newTask = new Task({ text: task });

    await newTask.save();

    res.status(200).json({
      newTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "error creating task",
      error: error.message,
    });
  }
};

export const taskDelete = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Task id is required" });
    }

    const result = await Task.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const getask = async (req, res) => {
  try {
    const tasks = await Task.find();
    console.log(tasks);
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
  }
};
