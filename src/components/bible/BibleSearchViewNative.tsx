import React, { useState } from "react";
import {
  Search,
  BookOpen,
  Filter,
  X,
  ChevronRight,
  Plus,
  History,
  Save,
  ArrowRight,
  Bookmark,
  Copy,
  Printer,
  MoreHorizontal,
} from "lucide-react";
import { Tooltip } from "../Tooltip";
import { Button } from "../ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { Input } from "../ui/Input";

interface SearchResult {
  id: string;
  reference: string;
  text: string;
  translation: string;
}

const BibleSearchViewNative: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedResults, setSelectedResults] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([
    "love",
    "faith",
    "hope",
    "grace",
  ]);

  // Mock search function
  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);

    // Add to search history
    if (!searchHistory.includes(searchQuery)) {
      setSearchHistory((prev) => [searchQuery, ...prev.slice(0, 9)]);
    }

    // Simulate API call with timeout
    setTimeout(() => {
      // Generate mock results
      const results: SearchResult[] = [
        {
          id: "1",
          reference: "John 3:16",
          text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
          translation: "NIV",
        },
        {
          id: "2",
          reference: "Romans 5:8",
          text: "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.",
          translation: "NIV",
        },
        {
          id: "3",
          reference: "1 John 4:19",
          text: "We love because he first loved us.",
          translation: "NIV",
        },
        {
          id: "4",
          reference: "Ephesians 2:4-5",
          text: "But because of his great love for us, God, who is rich in mercy, made us alive with Christ even when we were dead in transgressions—it is by grace you have been saved.",
          translation: "NIV",
        },
        {
          id: "5",
          reference: "John 15:13",
          text: "Greater love has no one than this: to lay down one's life for one's friends.",
          translation: "NIV",
        },
      ];

      setSearchResults(results);
      setIsSearching(false);
    }, 1000);
  };

  // Toggle result selection
  const toggleResultSelection = (resultId: string) => {
    setSelectedResults((prev) =>
      prev.includes(resultId)
        ? prev.filter((id) => id !== resultId)
        : [...prev, resultId],
    );
  };

  // Add selected results to presentation
  const addToPresentation = () => {
    if (selectedResults.length === 0) return;

    const versesToAdd = searchResults
      .filter((result) => selectedResults.includes(result.id))
      .map((result) => ({
        reference: result.reference,
        text: result.text,
        translation: result.translation,
      }));

    // Here you would add these verses to your presentation
    // For now, we'll just log them
    console.log("Adding verses to presentation:", versesToAdd);
  };

  return (
    <div className="flex flex-col h-full bg-neutral-900">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-2 border-b border-neutral-800 bg-neutral-800">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1.5"
          >
            <Search className="w-4 h-4 text-amber-400" />
            <span>Bible Search</span>
          </Button>
        </div>

        <div className="flex items-center gap-1">
          {/* Actions */}
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <History className="w-4 h-4" />
          </Button>

          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Save className="w-4 h-4" />
          </Button>

          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Search panel */}
        <div className="w-80 border-r border-neutral-800 flex flex-col bg-neutral-800/50">
          {/* Search input */}
          <div className="p-3 border-b border-neutral-800">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search the Bible..."
                className="pl-9 pr-9 bg-neutral-700/50 border-neutral-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-500" />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-5 w-5 rounded-full"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="w-3 h-3 text-neutral-400" />
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2 mt-2">
              <Button
                variant="secondary"
                size="sm"
                className="flex-1"
                onClick={handleSearch}
              >
                Search
              </Button>

              <Button
                variant={showFilters ? "primary" : "secondary"}
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className="h-8 w-8"
              >
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="p-3 border-b border-neutral-800">
              <h3 className="text-sm font-medium text-white mb-2">
                Search Filters
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">
                    Translation
                  </label>
                  <select className="w-full bg-neutral-700 border border-neutral-600 rounded-md px-3 py-1.5 text-sm text-white">
                    <option value="niv">New International Version (NIV)</option>
                    <option value="kjv">King James Version (KJV)</option>
                    <option value="esv">English Standard Version (ESV)</option>
                    <option value="nlt">New Living Translation (NLT)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-neutral-400 mb-1">
                    Search In
                  </label>
                  <select className="w-full bg-neutral-700 border border-neutral-600 rounded-md px-3 py-1.5 text-sm text-white">
                    <option value="all">All Books</option>
                    <option value="ot">Old Testament</option>
                    <option value="nt">New Testament</option>
                    <option value="gospels">Gospels</option>
                    <option value="paul">Pauline Epistles</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-neutral-400 mb-1">
                    Match
                  </label>
                  <div className="flex gap-2">
                    <label className="flex items-center gap-1.5">
                      <input
                        type="radio"
                        name="match"
                        className="text-blue-500"
                        defaultChecked
                      />
                      <span className="text-sm text-white">Any words</span>
                    </label>
                    <label className="flex items-center gap-1.5">
                      <input
                        type="radio"
                        name="match"
                        className="text-blue-500"
                      />
                      <span className="text-sm text-white">All words</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" className="text-blue-400">
                    Reset Filters
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Recent searches */}
          <div className="p-3 border-b border-neutral-800">
            <h3 className="text-xs font-medium text-neutral-400 mb-2">
              RECENT SEARCHES
            </h3>
            <div className="flex flex-wrap gap-1">
              {searchHistory.map((term) => (
                <Button
                  key={term}
                  variant="secondary"
                  size="sm"
                  className="text-xs py-1 h-auto"
                  onClick={() => {
                    setSearchQuery(term);
                    handleSearch();
                  }}
                >
                  {term}
                </Button>
              ))}
            </div>
          </div>

          {/* Search results count */}
          {searchResults.length > 0 && (
            <div className="p-3 border-b border-neutral-800">
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-400">
                  {searchResults.length} results for "{searchQuery}"
                </span>

                {selectedResults.length > 0 && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={addToPresentation}
                    className="text-xs py-1 h-auto"
                  >
                    Add {selectedResults.length}
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Results list */}
          <div className="flex-1 overflow-y-auto">
            {isSearching ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="text-neutral-400">Searching...</p>
                </div>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="divide-y divide-neutral-800">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className={`p-3 cursor-pointer ${selectedResults.includes(result.id) ? "bg-blue-500/10" : "hover:bg-neutral-800"}`}
                    onClick={() => toggleResultSelection(result.id)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-sm font-medium text-white">
                        {result.reference}
                      </h3>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-neutral-700 text-neutral-300">
                        {result.translation}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-300 line-clamp-2">
                      {result.text}
                    </p>

                    <div className="flex justify-end mt-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-blue-400 h-6 px-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Navigate to the full chapter view
                          console.log("View in context:", result.reference);
                        }}
                      >
                        View in context
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchQuery ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Search className="w-12 h-12 text-neutral-700 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">
                    No results found
                  </h3>
                  <p className="text-neutral-400 max-w-md px-4">
                    Try adjusting your search terms or filters to find what
                    you're looking for.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Search className="w-12 h-12 text-neutral-700 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">
                    Search the Bible
                  </h3>
                  <p className="text-neutral-400 max-w-md px-4">
                    Enter keywords, phrases, or references to find verses.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Result detail view */}
        <div className="flex-1 flex flex-col overflow-hidden bg-neutral-900">
          {selectedResults.length === 1 ? (
            <>
              {/* Toolbar */}
              <div className="flex items-center justify-between p-3 border-b border-neutral-800">
                <div>
                  <h2 className="text-lg font-medium text-white">
                    {
                      searchResults.find((r) => r.id === selectedResults[0])
                        ?.reference
                    }
                  </h2>
                  <p className="text-sm text-neutral-400">
                    {
                      searchResults.find((r) => r.id === selectedResults[0])
                        ?.translation
                    }
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Bookmark className="w-4 h-4" />
                  </Button>

                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Copy className="w-4 h-4" />
                  </Button>

                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Printer className="w-4 h-4" />
                  </Button>

                  <Button variant="primary" size="sm" className="ml-2">
                    <Plus className="w-3.5 h-3.5 mr-1.5" />
                    <span>Add to Presentation</span>
                  </Button>
                </div>
              </div>

              {/* Verse content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-3xl mx-auto">
                  <div className="prose prose-invert prose-lg max-w-none">
                    <p className="text-xl">
                      {
                        searchResults.find((r) => r.id === selectedResults[0])
                          ?.text
                      }
                    </p>
                  </div>

                  <div className="mt-8 pt-8 border-t border-neutral-800">
                    <h3 className="text-lg font-medium text-white mb-4">
                      Context
                    </h3>
                    <p className="text-neutral-400 italic">
                      Showing verses around{" "}
                      {
                        searchResults.find((r) => r.id === selectedResults[0])
                          ?.reference
                      }
                      ...
                    </p>

                    <div className="mt-4 space-y-2">
                      {/* Mock context verses */}
                      <p className="text-neutral-500">
                        14. For this reason I kneel before the Father,
                      </p>
                      <p className="text-neutral-500">
                        15. from whom every family in heaven and on earth
                        derives its name.
                      </p>
                      <p className="bg-blue-500/10 p-2 rounded text-white">
                        16. I pray that out of his glorious riches he may
                        strengthen you with power through his Spirit in your
                        inner being,
                      </p>
                      <p className="text-neutral-500">
                        17. so that Christ may dwell in your hearts through
                        faith. And I pray that you, being rooted and established
                        in love,
                      </p>
                      <p className="text-neutral-500">
                        18. may have power, together with all the Lord's holy
                        people, to grasp how wide and long and high and deep is
                        the love of Christ,
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : selectedResults.length > 1 ? (
            <>
              {/* Multiple selection toolbar */}
              <div className="flex items-center justify-between p-3 border-b border-neutral-800">
                <h2 className="text-lg font-medium text-white">
                  {selectedResults.length} Verses Selected
                </h2>

                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setSelectedResults([])}
                  >
                    Clear
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={addToPresentation}
                  >
                    <Plus className="w-3.5 h-3.5 mr-1.5" />
                    <span>Add to Presentation</span>
                  </Button>
                </div>
              </div>

              {/* Selected verses */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-3xl mx-auto space-y-6">
                  {selectedResults.map((id) => {
                    const result = searchResults.find((r) => r.id === id);
                    return result ? (
                      <Card
                        key={id}
                        className="bg-neutral-800 border-neutral-700"
                      >
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-base">
                              {result.reference}
                            </CardTitle>
                            <span className="text-xs px-1.5 py-0.5 rounded bg-neutral-700 text-neutral-300">
                              {result.translation}
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-neutral-200">{result.text}</p>
                        </CardContent>
                      </Card>
                    ) : null;
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <BookOpen className="w-16 h-16 text-neutral-700 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">
                  Select a search result
                </h3>
                <p className="text-neutral-400 max-w-md">
                  Search for Bible verses and select a result to view details.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BibleSearchViewNative;
