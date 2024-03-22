import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { singinInput, singupInput } from "@tanishk7838/medium-common";
import { Hono } from "hono";
import { sign } from "hono/jwt";

export const userRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRoute.post("/singup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const {success } = singupInput.safeParse(body)
  if(!success){
    c.status(411)
    return c.text("Invalid Inputs")
  }
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    c.status(200);
    return c.json({
      jwt: token,
    });
  } catch (error) {
    c.status(411);
    return c.text("User Already Exist");
  }
});
userRoute.post("/singin", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const {success} = singinInput.safeParse(body)
  if(!success){
    c.status(411)
    return c.text("Invalid Inputs")
  }
  try {
    const user = await prisma.user.findFirst({
      where: { email: body.email, password: body.password },
    });

    if (!user) {
      c.status(403);
      return c.text("Invalid Credentials");
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    c.status(200);
    return c.json({
      jwt: token,
    });
  } catch (error) {
    c.status(411);
    return c.text("Invalid");
  }
});
