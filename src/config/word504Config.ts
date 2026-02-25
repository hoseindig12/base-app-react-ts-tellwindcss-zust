// daily word count is driven by an environment variable so it can
// be tweaked without rebuilding the app.  Create a `.env` file in
// the project root with a value for `REACT_APP_WORD504_DAILY_WORD_COUNT`.
// the (very generous) default is 150 to match the previous hardcoded
// constant.

export const WORD504_DAILY_WORD_COUNT = parseInt(
    process.env.REACT_APP_WORD504_DAILY_WORD_COUNT ?? "150",
    10
);
