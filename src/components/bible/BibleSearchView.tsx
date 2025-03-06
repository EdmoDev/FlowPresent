import React, { useState } from "react";
import { Search, BookOpen, Filter, X, ChevronRight, Plus } from "lucide-react";
import { Tooltip } from "../Tooltip";

interface SearchResult {
  id: string;
  reference: string;
  text: string;
  translation: string;
}

const BibleSearchView: React.FC = () => {
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
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[var(--border-subtle)] bg-background-elevated flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-accent-blue" />
          <h2 className="text-lg font-medium text-text-primary">
            Bible Search
          </h2>
        </div>
      </div>

      {/* Search area */}
      <div className="p-4 border-b border-[var(--border-subtle)]">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search the Bible..."
              className="glass-input w-full pl-9 pr-4 py-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
            {searchQuery && (
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-background-glass/20"
                onClick={() => setSearchQuery("")}
              >
                <X className="w-3.5 h-3.5 text-text-secondary" />
              </button>
            )}
          </div>

          <Tooltip content="Search filters" position="top">
            <button
              className={`p-2 rounded-md ${showFilters ? "bg-accent-blue/10 text-accent-blue" : "hover:bg-background-glass/10 text-text-secondary"}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-5 h-5" />
            </button>
          </Tooltip>

          <button
            className="px-4 py-2 bg-accent-blue text-white rounded-md hover:bg-accent-blue/90 transition-colors"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {/* Filters (conditionally shown) */}
        {showFilters && (
          <div className="mt-3 p-3 bg-background-glass/10 rounded-md border border-[var(--border-subtle)]">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-text-secondary mb-1">
                  Translation
                </label>
                <select className="glass-input w-full">
                  <option value="niv">New International Version (NIV)</option>
                  <option value="kjv">King James Version (KJV)</option>
                  <option value="esv">English Standard Version (ESV)</option>
                  <option value="nlt">New Living Translation (NLT)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-text-secondary mb-1">
                  Book
                </label>
                <select className="glass-input w-full">
                  <option value="all">All Books</option>
                  <option value="ot">Old Testament</option>
                  <option value="nt">New Testament</option>
                  <option value="gospels">Gospels</option>
                  <option value="paul">Pauline Epistles</option>
                </select>
              </div>
            </div>

            <div className="mt-3 flex justify-end">
              <button className="text-sm text-accent-blue hover:underline">
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {isSearching ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-accent-blue border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-text-secondary">Searching...</p>
            </div>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="p-4">
            <div className="mb-3 flex justify-between items-center">
              <p className="text-sm text-text-secondary">
                {searchResults.length} results for "{searchQuery}"
              </p>

              {selectedResults.length > 0 && (
                <button
                  className="px-3 py-1.5 bg-accent-blue text-white rounded-md flex items-center gap-1.5 hover:bg-accent-blue/90 transition-colors"
                  onClick={addToPresentation}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add {selectedResults.length} to Presentation</span>
                </button>
              )}
            </div>

            <div className="space-y-3">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className={`p-4 rounded-lg border ${selectedResults.includes(result.id) ? "border-accent-blue/30 bg-accent-blue/5" : "border-[var(--border-subtle)] hover:bg-background-glass/10"}`}
                  onClick={() => toggleResultSelection(result.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium text-text-primary">
                      {result.reference}
                    </h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-background-glass/20 text-text-secondary">
                      {result.translation}
                    </span>
                  </div>
                  <p className="text-text-primary">{result.text}</p>

                  <div className="mt-3 flex justify-end">
                    <button
                      className="text-sm text-accent-blue flex items-center gap-1 hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Navigate to the full chapter view
                        console.log("View in context:", result.reference);
                      }}
                    >
                      View in context
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : searchQuery ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Search className="w-16 h-16 text-text-secondary/30 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">
                No results found
              </h3>
              <p className="text-text-secondary max-w-md">
                Try adjusting your search terms or filters to find what you're
                looking for.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Search className="w-16 h-16 text-text-secondary/30 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">
                Search the Bible
              </h3>
              <p className="text-text-secondary max-w-md">
                Enter keywords, phrases, or references to find verses.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BibleSearchView;
