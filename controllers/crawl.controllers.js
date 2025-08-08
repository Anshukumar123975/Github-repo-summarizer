import { crawlRepo } from '../service/crawl.service.js';

export const lightCrawl = async (req, res) => {
  const { repoUrl } = req.body;

  try {
    const result = await crawlRepo(repoUrl);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
