import dotenv from "dotenv";
import express from "express";
import { AddressInfo } from "net";
import signup from "./endpoints/signup"
import login  from "./endpoints/login";
import createRecipe from "./endpoints/createRecipe";
import getRecipe from "./endpoints/getRecipe";
import followUser from "./endpoints/followUser";
import getUserProfile from "./endpoints/getUserProfile";
import getRecipesFeed from "./endpoints/recipesFeed";
import getUserById from "./endpoints/getAnyUserById";
import editRecipe from "./endpoints/editRecipe";
import deleteRecipe from "./endpoints/deleteRecipe"

dotenv.config()

const app = express()
app.use(express.json())

app.post("/signup", signup)
app.post("/login", login)
app.post("/recipe", createRecipe)
app.get("/recipe/:id", getRecipe)
app.post("/user/follow", followUser)
app.get("/user/profile", getUserProfile)
app.get("/user/:id", getUserById)
app.get("/user/feed", getRecipesFeed)
app.put("/recipe/edit/:id", editRecipe)
app.delete("/recipe/delete/:id", deleteRecipe)



















const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Server is running in http://localhost:${address.port}`);
    } else {
      console.error(`Failure upon starting server.`);
    }
  });

















