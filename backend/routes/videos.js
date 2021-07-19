const express = require("express");
const crypto = require("crypto");
const {dbPool} = require("./../bin/utils");
const YouTubeDownloader = require("ytdl-core");
const router = express.Router();

const YouTubeRegex = /.*youtube.com\/watch\?v=([a-zA-Z0-9_-]{11}).*|.*youtu.be\/([a-zA-Z0-9_-]{11}).*|([a-zA-Z0-9_-]{11})/;

/* GET home page. */
router.get('/get', async function(req, res, next) {
    if (req.query.id === undefined) req.query.id = null;

    try {
        const [rows] = await dbPool.query("SELECT videos.videoid, submitter, SUM(IF(upvotes.weight = 1 and upvotes.voter != ?, 1, 0)) AS upvotes, SUM(IF(upvotes.weight = -1 and upvotes.voter != ?, 1, 0)) AS downvotes, SUM(IF( upvotes.voter = ?, upvotes.weight, 0)) AS myvoteweight FROM `videos` LEFT JOIN upvotes ON upvotes.videoid = videos.videoid WHERE videos.mod_hidden = 0 and videos.errored = 0  GROUP BY videos.videoid;", [req.query.id, req.query.id, req.query.id]);

        const json = [];

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const submitter = crypto.createHash("sha256").update(row.submitter).digest("hex");

            json.push({id: row.videoid, submitter,upvotes: row.upvotes, downvotes: row.downvotes, myvoteweight: row.myvoteweight});
        }

        res.json(json).end();
    } catch (e) {
        console.log(e);
        res.json([]).end();
    }
});

function anyUndefined(...params) {
    for (let v in params) if (params.hasOwnProperty(v) && v === undefined) return true;
    return false;
}

router.post("/vote", async function(req, res, next) {
    let {id, video, weight} = req.body;
    try {
        if (!anyUndefined(id,video,weight)) {
            weight = parseInt(weight);

            if (!(weight >= -1 && weight <= 1)) return res.send("false").end();
            if (id.length <= 3 || id.length >= 37) return res.send("false").end();

            const ytIds = video.match(YouTubeRegex);

            if (ytIds !== null) {
                video = ytIds[1] || ytIds[2] || ytIds[3];
                if (video.length !== 11) return res.send("false").end();
            } else {
                return res.send("false").end();
            }

            if (weight === 0) {
                await dbPool.query("DELETE FROM upvotes WHERE voter=? AND videoid=?", [id, video]);
                return res.send("0").end();
            } else {
                await dbPool.query("INSERT INTO upvotes (videoid, weight, voter) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE weight = ?", [video, weight, id, weight]);
                return res.send(weight.toString()).end();
            }

        } else {
            res.send("false").end();
        }
    } catch (e) {
        res.send("false").end();
    }
});

router.post("/submit", async function(req, res, next) {
    let {id, video} = req.body;

    if (video === "") return res.send("Please enter a video link!").end();

    try {
        if (!anyUndefined(id, video)) {
            const ytIds = video.match(YouTubeRegex);

            if (ytIds !== null) {
                video = ytIds[1] || ytIds[2] || ytIds[3];
                if (video.length !== 11) return res.send("Couldn't get youtube video ID from URL.").end();
            } else {
                return res.send("Couldn't get youtube video ID from URL.").end();
            }

            try {
                const videoInfo = await YouTubeDownloader.getInfo(video);

                if (parseInt(videoInfo.videoDetails.lengthSeconds) > 120) {
                    return res.send("Videos can't be longer than 2 Minutes.").end();
                }

                if (!videoInfo.player_response.playabilityStatus.playableInEmbed) {
                    return res.send("This video can't be played here due to restrictions by YouTube.").end();
                }
            } catch (e) {
                return res.send("Failed to connect to YouTube to get video info.").end();
            }

            if (id.length <= 3 || id.length >= 37) return res.send("You're not signed in as a valid user.").end();

            const [rows] = await dbPool.query("SELECT * FROM videos WHERE videoid=?", [video]);

            if (rows.length === 0) {
                await dbPool.query("INSERT INTO videos (videoid, submitter) VALUES (?, ?);", [video, id]);
                return res.send("Thank you, your video has been added!").end();
            } else {
                return res.send("Somebody else has already added that video.").end();
            }
        } else {
            return res.send("Details missing!").end();
        }
    } catch(e) {
        return res.send("An unexpected error occurred!").end();
    }
});


router.post("/error", async function(req, res, next) {
    let {video} = req.body;
    try {
        if (!anyUndefined(video)) {
            const ytIds = video.match(YouTubeRegex);

            if (ytIds !== null) {
                video = ytIds[1] || ytIds[2] || ytIds[3];
                if (video.length !== 11) return res.end();
            } else {
                return res.end();
            }

            try {
                const videoInfo = await YouTubeDownloader.getInfo(video);

                console.log(videoInfo);

                if (!videoInfo.player_response.playabilityStatus.playableInEmbed) {
                    await dbPool.query("UPDATE videos SET errored = 1 WHERE videoid=?", [video]);
                }
            } catch (e) {
                await dbPool.query("UPDATE videos SET errored = 1 WHERE videoid=?", [video]);
            }
        }
    } catch(e) {}

    res.header("X-Thank-You", "Thank you!").send("thanks").end();
});

module.exports = router;