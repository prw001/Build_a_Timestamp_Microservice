import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line

app.get("/api", (req, res) => {
  res.status(303).redirect("/api/date=?");
});

app.get("/api/:date", (req, res) => {
  const { date } = req.params;
  const numRegex = /^[0-9]+$/;
  let dateObj = new Date();
  //arg is in ms
  if (numRegex.test(date))
  {
    dateObj.setTime(date);
  }
  else if (date === "") //empty arg, set to now
  {
    dateObj.setTime(Date.now());
  }
  else //string date provided
  {
    dateObj = new Date(date);
  }

  console.log(date, dateObj.toUTCString(), dateObj.getTime());
  const utc = dateObj.toUTCString;
  const unix = dateObj.getTime();

  //invalid args passed to url
  if (utc === "Invalid Date" || isNaN(unix))
  {
    res.status(200).json({
      error: "Invalid Date"
    });
  }
  else
  {
    res.status(200).json({
      unix: dateObj.getTime(),
      utc: dateObj.toUTCString()
    });
  }
});
// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
