const axios = require("axios");

const getLatestNews = async (req, res) => {
  try {
    const apiKey = "pub_68689a571a7a7bcf473e0f1f7bd12d429fe5f";
    const query = "news";
    const apiUrl = `https://newsdata.io/api/1/latest?apikey=${apiKey}&q=${query}`;

    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.status === "success") {
      const results = data.results
        .filter((result) => result.image_url !== null)
        .map((result) => ({
          ...result,
          toJSON() {
            const { title, description, image_url, link } = this;
            return { title, description, image_url, link };
          },
        }));

      res.status(200).json(results);
    } else {
      console.error("API returned an error:", data);
      res.status(500).json({ error: "Failed to fetch news data" });
    }
  } catch (error) {
    console.error("Error fetching news data:", error.response.data);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getLatestNews,
};
