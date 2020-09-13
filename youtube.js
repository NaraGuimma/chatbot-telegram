const YouTube = require("youtube-node");
const config = require("./yt-config.json");


const youtube = new YouTube();
youtube.setKey(config.key);




function searchVideoURL(message, queryText) {
  return new Promise((resolve, _) => {
    youtube.search(`aprendendo sobre JavaScript ${queryText}`, 2, function (err, result) {
      if (!err) {
        const videosIds = result.items.map((item) => item.id.videoId).filter(item => item);
        const youtubeLinks = videosIds.map((videoId => `https://www.youtube.com/watch?v=${videoId}`));
        resolve(`${message} ${youtubeLinks.join(`, `)}`);
      } else {
        resolve('Não foi possível retornar nenhum vídeo. Digite novamente, por favor');
      }
    });
  });
};

module.exports.searchVideoURL = searchVideoURL;
