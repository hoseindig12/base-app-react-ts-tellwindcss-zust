import { useState, useEffect, type MouseEvent } from "react";
import { IRREGULAR_VERBS } from "../data/irregularVerbs";

const STORAGE_KEY = "selectedVerbs";
const FORGOTTEN_STORAGE_KEY = "forgottenVerbs";

export default function IrregularVerbList() {
  const [selectedVerbs, setSelectedVerbs] = useState<string[]>([]);
  const [forgottenVerbs, setForgottenVerbs] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  // controls which subset of verbs is shown: all / only selected / only forgotten
  const [filterMode, setFilterMode] = useState<
    "all" | "selected" | "forgotten"
  >("all");

  // Ø¨Ø§Ø±Ú¯Ø°Ø§Ø±ÛŒ Ø¯Ø§Ø¯Ù‡â€ŒÙ‡Ø§ÛŒ Ø°Ø®ÛŒØ±Ù‡ Ø´Ø¯Ù‡ Ù‡Ù†Ú¯Ø§Ù… Ø¨Ø§Ø±Ú¯ÛŒØ±ÛŒ ØµÙØ­Ù‡
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSelectedVerbs(JSON.parse(stored));
      } catch (error) {
        console.error("Error loading selected verbs:", error);
      }
    }

    const forgottenStored = localStorage.getItem(FORGOTTEN_STORAGE_KEY);
    if (forgottenStored) {
      try {
        setForgottenVerbs(JSON.parse(forgottenStored));
      } catch (error) {
        console.error("Error loading forgotten verbs:", error);
      }
    }
  }, []);

  // Ø°Ø®ÛŒØ±Ù‡ Ø§Ù†ØªØ®Ø§Ø¨â€ŒÙ‡Ø§ Ø¯Ø± localStorage
  const handleRowClick = (verbBase: string) => {
    setSelectedVerbs((prev) => {
      const updated = prev.includes(verbBase)
        ? prev.filter((v) => v !== verbBase)
        : [...prev, verbBase];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    setForgottenVerbs((prev) => {
      if (!prev.includes(verbBase)) return prev;
      const updated = prev.filter((v) => v !== verbBase);
      localStorage.setItem(FORGOTTEN_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const isSelected = (verbBase: string) => selectedVerbs.includes(verbBase);
  const isForgotten = (verbBase: string) => forgottenVerbs.includes(verbBase);

  const handleRowRightClick = (
    event: MouseEvent<HTMLTableRowElement>,
    verbBase: string,
  ) => {
    event.preventDefault();
    setForgottenVerbs((prev) => {
      const updated = prev.includes(verbBase)
        ? prev.filter((v) => v !== verbBase)
        : [...prev, verbBase];
      localStorage.setItem(FORGOTTEN_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    setSelectedVerbs((prev) => {
      if (!prev.includes(verbBase)) return prev;
      const updated = prev.filter((v) => v !== verbBase);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const clearAllSelections = () => {
    setSelectedVerbs([]);
    setForgottenVerbs([]);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(FORGOTTEN_STORAGE_KEY);
  };

  const handleSpeak = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // Ù…ØªÙˆÙ‚Ù Ú©Ø±Ø¯Ù† ØµØ¯Ø§ÛŒ Ù‚Ø¨Ù„ÛŒ
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Irregular Verbs List</h1>
        <div className="flex items-center gap-3">
          <span
            role="button"
            onClick={() =>
              setFilterMode((f) => (f === "selected" ? "all" : "selected"))
            }
            className={`px-3 py-1 rounded text-sm font-medium cursor-pointer transition-colors ${
              filterMode === "selected"
                ? "bg-blue-500 text-white"
                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
            }`}
            title="نمایش فقط انتخاب‌شده‌ها"
          >
            آبی: {selectedVerbs.length}
          </span>
          <span
            role="button"
            onClick={() =>
              setFilterMode((f) => (f === "forgotten" ? "all" : "forgotten"))
            }
            className={`px-3 py-1 rounded text-sm font-medium cursor-pointer transition-colors ${
              filterMode === "forgotten"
                ? "bg-red-500 text-white"
                : "bg-red-100 text-red-800 hover:bg-red-200"
            }`}
            title="نمایش فقط فراموش‌شده‌ها"
          >
            قرمز: {forgottenVerbs.length}
          </span>
          {(selectedVerbs.length > 0 || forgottenVerbs.length > 0) && (
            <button
              onClick={clearAllSelections}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              حذف همه انتخاب‌ها ({selectedVerbs.length + forgottenVerbs.length})
            </button>
          )}
        </div>
      </div>

      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="جستجو کنید..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 pr-10 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label="Clear search"
            title="پاک کردن جستجو"
          >
            ×
          </button>
        )}
      </div>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Base</th>
            <th className="border p-2 text-left">Past</th>
            <th className="border p-2 text-left">Past Participle</th>
          </tr>
        </thead>
        <tbody>
          {[...IRREGULAR_VERBS]
            .sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0))
            .filter((v) => {
              // apply search term
              const matchesSearch =
                v.base.toLowerCase().includes(searchTerm.toLowerCase()) ||
                v.past.toLowerCase().includes(searchTerm.toLowerCase()) ||
                v.pastParticiple
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase());
              if (!matchesSearch) return false;

              // apply filter badge state
              if (filterMode === "selected") return isSelected(v.base);
              if (filterMode === "forgotten") return isForgotten(v.base);
              return true;
            })
            .map((v, i) => (
              <tr
                key={v.base + i}
                onClick={() => handleRowClick(v.base)}
                onContextMenu={(event) => handleRowRightClick(event, v.base)}
                className={`cursor-pointer transition-colors ${
                  isForgotten(v.base)
                    ? "bg-red-200 hover:bg-red-300"
                    : isSelected(v.base)
                      ? "bg-blue-200 hover:bg-blue-300"
                      : "hover:bg-gray-50"
                }`}
              >
                <td className="border p-2">
                  <div className="flex items-center gap-2">
                    <span>{v.base}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeak(v.base);
                      }}
                      className="text-xl hover:scale-110 transition-transform"
                      title="تلفظ کنید"
                    >
                      🔊
                    </button>
                  </div>
                </td>
                <td className="border p-2">
                  <div className="flex items-center gap-2">
                    <span>{v.past}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeak(v.past);
                      }}
                      className="text-xl hover:scale-110 transition-transform"
                      title="تلفظ کنید"
                    >
                      🔊
                    </button>
                  </div>
                </td>
                <td className="border p-2">
                  <div className="flex items-center gap-2">
                    <span>{v.pastParticiple}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeak(v.pastParticiple);
                      }}
                      className="text-xl hover:scale-110 transition-transform"
                      title="تلفظ کنید"
                    >
                      🔊
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
