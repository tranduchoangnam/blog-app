import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//set timezone
const saveHistory = async (id, des, inf, data) => {
  const date = new Date().toLocaleString("sv-SE", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  let history = await prisma.history.create({
    data: {
      userId: id,
      des: des,
      inf: inf,
      result: data,
      date: date,
    },
  });
};
const getHistory = async (req, res) => {
  //only take 5 recent history
  let history = await prisma.history.findMany({
    where: {
      userId: req.user.userId,
    },
    orderBy: {
      id: "desc",
    },
    take: 5,
  });
  res.json(history);
};
export default { saveHistory, getHistory };
