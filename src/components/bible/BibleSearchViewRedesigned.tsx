import React, { useState } from "react";
import { Search, BookOpen, Filter, X, ChevronRight, Plus } from "lucide-react";
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

const BibleSearchViewRedesigned: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedResults, setSelectedResults] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Mock search function
  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);

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
    <div className="flex flex-col h-full bg-neutral-800/50">
      {/* Header */}
      <Card
        variant="glass"
        padding="none"
        className="rounded-none border-x-0 border-t-0"
      >
        <CardHeader className="flex flex-row items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-accent-blue" />
            <CardTitle className="text-lg">Bible Search</CardTitle>
          </div>
        </CardHeader>
      </Card>

      {/* Search area */}
      <Card
        variant="glass"
        padding="none"
        className="rounded-none border-x-0 border-t-0"
      >
        <CardContent className="p-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search the Bible..."
                className="pl-9 pr-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-500" />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-auto w-auto rounded-full"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="w-3.5 h-3.5 text-neutral-400" />
                </Button>
              )}
            </div>

            <Tooltip content="Search filters" position="top">
              <Button
                variant={showFilters ? "primary" : "ghost"}
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className={
                  showFilters ? "bg-accent-blue/10 text-accent-blue" : ""
                }
              >
                <Filter className="w-5 h-5" />
              </Button>
            </Tooltip>

            <Button variant="primary" onClick={handleSearch}>
              Search
            </Button>
          </div>

          {/* Filters (conditionally shown) */}
          {showFilters && (
            <Card variant="glass" className="mt-3">
              <CardContent className="p-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-neutral-400 mb-1">
                      Translation
                    </label>
                    <select className="flex h-9 w-full rounded-md border border-white/10 bg-neutral-800/50 px-3 py-2 text-sm text-white shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="niv">
                        New International Version (NIV)
                      </option>
                      <option value="kjv">King James Version (KJV)</option>
                      <option value="esv">
                        English Standard Version (ESV)
                      </option>
                      <option value="nlt">New Living Translation (NLT)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-neutral-400 mb-1">
                      Book
                    </label>
                    <select className="flex h-9 w-full rounded-md border border-white/10 bg-neutral-800/50 px-3 py-2 text-sm text-white shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="all">All Books</option>
                      <option value="ot">Old Testament</option>
                      <option value="nt">New Testament</option>
                      <option value="gospels">Gospels</option>
                      <option value="paul">Pauline Epistles</option>
                    </select>
                  </div>
                </div>

                <div className="mt-3 flex justify-end">
                  <Button
                    variant="ghost"
                    className="text-accent-blue hover:text-accent-blue/90"
                  >
                    Reset Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Results area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {isSearching ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-accent-blue border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-neutral-400">Searching...</p>
            </div>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="p-4">
            <div className="mb-3 flex justify-between items-center">
              <p className="text-sm text-neutral-400">
                {searchResults.length} results for "{searchQuery}"
              </p>

              {selectedResults.length > 0 && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={addToPresentation}
                  className="flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add {selectedResults.length} to Presentation</span>
                </Button>
              )}
            </div>

            <div className="space-y-3">
              {searchResults.map((result) => (
                <Card
                  key={result.id}
                  variant={
                    selectedResults.includes(result.id) ? "outline" : "default"
                  }
                  className={`cursor-pointer ${selectedResults.includes(result.id) ? "bg-accent-blue/10 border-accent-blue/30" : "hover:bg-white/5"}`}
                  onClick={() => toggleResultSelection(result.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium text-white">
                        {result.reference}
                      </h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-neutral-700/50 text-neutral-300">
                        {result.translation}
                      </span>
                    </div>
                    <p className="text-white">{result.text}</p>

                    <div className="mt-3 flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-accent-blue flex items-center gap-1 hover:text-accent-blue/90"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Navigate to the full chapter view
                          console.log("View in context:", result.reference);
                        }}
                      >
                        View in context
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : searchQuery ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Search className="w-16 h-16 text-neutral-500/30 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                No results found
              </h3>
              <p className="text-neutral-400 max-w-md">
                Try adjusting your search terms or filters to find what you're
                looking for.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Search className="w-16 h-16 text-neutral-500/30 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                Search the Bible
              </h3>
              <p className="text-neutral-400 max-w-md">
                Enter keywords, phrases, or references to find verses.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BibleSearchViewRedesigned;
