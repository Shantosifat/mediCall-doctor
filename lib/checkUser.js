import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  try {
    const loggedInUSer = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });
    if(loggedInUSer){
        return loggedInUSer;
    }
    const name = `${user.firstName} ${user.lastName}`

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
        transactions: {
          create: {
            type: "CREDIT_PURCHASE",
            packageId: "free_user",
            amount: 0,
          },
        },
      },
    });
    return newUser

  } catch (error) {
    console.log(error.message);
  }
};
