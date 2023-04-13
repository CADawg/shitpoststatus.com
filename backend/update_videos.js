require("dotenv").config();
const YouTubeDownloader = require("ytdl-core");
const {dbPool} = require("./bin/utils");

(async function () {
    const [rows] = await dbPool.query("SELECT videoid FROM videos WHERE title is null;");

    for (let i = 0; i < rows.length; i++) {
        try {
            console.log(rows[i].videoid);
            const videoInfo = await YouTubeDownloader.getBasicInfo(rows[i].videoid);

            let title, keywords, description;

            title = videoInfo.videoDetails.title || null;
            keywords = videoInfo.videoDetails.keywords || null;
            description = videoInfo.videoDetails.description || null;

            if (keywords ?? false) keywords = keywords.join(",");

            await dbPool.query("UPDATE videos SET title = ?, keywords = ?, description = ? WHERE videoid=?", [title, keywords, description, rows[i].videoid]);
        } catch (e) {
            //console.log(e);
        }
    }
})();