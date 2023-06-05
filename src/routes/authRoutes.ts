import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

//function to generate a random 8 digit number
function generateEmailToken(): string {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

const EMAIL_TOKEN_EXPIRES_IN_MINUTES = 10;

//create a user if it doesn't exist
//generate an email token and send it to the user mail
router.post("/login", async (req, res) => {
  const { email, name } = req.body;

  //generate token
  const emailToken = generateEmailToken();
  const expiration = new Date(
    new Date().getTime() + EMAIL_TOKEN_EXPIRES_IN_MINUTES * 60 * 1000
  );

  try {
    const createdToken = await prisma.token.create({
      data: {
        type: "EMAIL",
        emailToken,
        expiration,
        user: {
          connectOrCreate: {
            where: { email },
            create: { email: email },
          },
        },
      },
    });
    console.log(createdToken);
    res.json(createdToken);
  } catch (error) {
    console.log(error);
  }

  //send email token to users email
});

//validate email the token
//generate the JWT token

router.post("/authenticate", async (req, res) => {
  const { emailToken, email } = req.body;

  try {
    const dbEmailToken = await prisma.token.findUnique({
      where: {
        emailToken,
      },
      include: {
        user: true,
      },
    });
    if (!dbEmailToken || !dbEmailToken.valid) {
      return res.status(401).send("invalid token,not found");
    }

    if (dbEmailToken.expiration < new Date()) {
      return res.status(401).send("token expired");
    }
    console.log(dbEmailToken);

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

export default router;
