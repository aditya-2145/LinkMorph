const {nanoid} = require("nanoid");
const URL = require("../models/url");
async function handleGenerateShortURL(req, res) {
    const body = req.body;
    
    if(!body.URL) return res.status(400).json({error : "URL not avilable"});
    
    const shortID = nanoid(8);
    await URL.create({
        shortId: shortID,
        redirectURL: body.URL,
        visitHistory:[],
        createdBy: req.user._id,
    }
    );
    return res.render("home",{
        ID: shortID,
    });
};
async function handleRedirectedUrl(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId,
    },{
        $push:{
            visitHistory:{
                timestamp:Date.now(),
            }
        }
    });
    res.redirect(entry.redirectURL);  
};

async function handleAnalyticsUrl(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({totalClicks: result.visitHistory.length, 
        analytics: result.visitHistory,})
};
module.exports={
    handleGenerateShortURL,
    handleRedirectedUrl,
    handleAnalyticsUrl,
}