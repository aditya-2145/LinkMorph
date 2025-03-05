const express = require("express");
const router = express.Router();
const {handleGenerateShortURL,handleRedirectedUrl,handleAnalyticsUrl} = require("../controllers/url")
router.post("/",handleGenerateShortURL);
router.get("/:shortId",handleRedirectedUrl);
router.get("/analytics/:shortId",handleAnalyticsUrl);

module.exports=router;