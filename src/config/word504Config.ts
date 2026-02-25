// daily word count is driven by a Vite environment variable so it can
// be tweaked without rebuilding the app.  Add to a `.env` file at the
// project root with the `VITE_` prefix (Vite exposes only those vars to
// the client).
// default is 150 to match the original hardcoded constant.

const rawCount = import.meta.env.VITE_WORD504_DAILY_WORD_COUNT;
export const WORD504_DAILY_WORD_COUNT = parseInt(rawCount ?? "150", 10);
