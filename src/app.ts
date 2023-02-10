import { json } from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import todoRoutes from "./routes/todos";

const app = express();
app.use(json());
app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "alive" });
});

app.use("/todos", todoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ msg: err.message });
});
const port = 3000;
const start = async () => {
  try {
    // await db connection

    app.listen(port, () => {
      console.log("alive && listening on port " + port);
    });
  } catch (error: any) {
    console.log("error", error.message);
  }
};
start();
