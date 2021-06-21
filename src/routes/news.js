const express = require("express");
const newsRouter = express.Router();
const axios = require("axios");

newsRouter.get("", async (req, res) => {
  try {
    const newsAPI = await axios.get(`https://raddy.co.uk/wp-json/wp/v2/posts/`);
    res.render("news", { articles: newsAPI.data });
  } catch (error) {
    res.render("news", { articles: null });
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.error("error", error.message);
    }
  }
});

newsRouter.get("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    const newsAPI = await axios.get(
      `https://raddy.co.uk/wp-json/wp/v2/posts/${id}`
    );
    res.render("new", { article: newsAPI.data });
  } catch (error) {
    res.render("new", { article: null });
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.error("error", error.message);
    }
  }
});

newsRouter.post("/", async (req, res) => {
  let { search } = req.body;
  try {
    const newsAPI = await axios.get(
      `https://raddy.co.uk/wp-json/wp/v2/posts?search=${search}`
    );
    res.render("newsSearch", { articles: newsAPI.data });
  } catch (error) {
    res.render("newsSearch", { articles: null });
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.error("error", error.message);
    }
  }
});

module.exports = newsRouter;
