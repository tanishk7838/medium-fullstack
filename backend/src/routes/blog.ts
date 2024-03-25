import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlog, updateBlog } from "@tanishk7838/medium-common";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }, 
  Variables :{
    userId : string
  }
}>();

blogRoute.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || ""
    const user = await verify(authHeader, c.env.JWT_SECRET)
    if(user){
        c.set("userId", user.id)
        await next();
    }else{
        c.status(403)
        return c.json({
            message : "You are not logged in"
        })
    }
});

blogRoute.post("/", async (c) => {
  const body = await c.req.json();
  const authorId = c.get("userId")
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const {success} = createBlog.safeParse(body)
  if(!success){
    c.status(411)
    return c.text("Invalid Inputs")
  }

  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId,
    },
  });

  return c.json({
    id: blog.id,
  });
});

blogRoute.put("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const {success} = updateBlog.safeParse(body)
  if(!success){
    c.status(411)
    return c.text("Invalid Inputs")
  }
  const blog = await prisma.blog.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({
    id: blog.id,
  });
});

blogRoute.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const blogs = await prisma.blog.findMany();
    return c.json({
      blogs: blogs,
      id : c.get("userId")
    });
  });
  
blogRoute.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.blog.findFirst({
    where: {
      id: id,
    },
  });
  c.status(200);
  return c.json(blog);
});

