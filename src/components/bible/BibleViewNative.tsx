import React, { useState, useEffect } from "react";
import {
  Search,
  Book,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Plus,
  Bookmark,
  Share2,
  Download,
  Filter,
  Copy,
  Printer,
  MoreHorizontal,
  ArrowLeft,
  ArrowRight,
  List,
} from "lucide-react";
import { Tooltip } from "../Tooltip";
import { useUI } from "../../contexts/UIContext";
import { Button } from "../ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { Input } from "../ui/Input";

interface BibleTranslation {
  id: string;
  name: string;
  abbreviation: string;
}

interface BibleBook {
  id: string;
  name: string;
  chapters: number;
}

interface BibleVerse {
  verse: number;
  text: string;
}

interface BibleChapter {
  book: string;
  chapter: number;
  verses: BibleVerse[];
}

const translations: BibleTranslation[] = [
  { id: "kjv", name: "King James Version", abbreviation: "KJV" },
  { id: "niv", name: "New International Version", abbreviation: "NIV" },
  { id: "esv", name: "English Standard Version", abbreviation: "ESV" },
  { id: "nlt", name: "New Living Translation", abbreviation: "NLT" },
  { id: "nasb", name: "New American Standard Bible", abbreviation: "NASB" },
];

const bibleBooks: BibleBook[] = [
  { id: "genesis", name: "Genesis", chapters: 50 },
  { id: "exodus", name: "Exodus", chapters: 40 },
  { id: "leviticus", name: "Leviticus", chapters: 27 },
  { id: "numbers", name: "Numbers", chapters: 36 },
  { id: "deuteronomy", name: "Deuteronomy", chapters: 34 },
  { id: "joshua", name: "Joshua", chapters: 24 },
  { id: "judges", name: "Judges", chapters: 21 },
  { id: "ruth", name: "Ruth", chapters: 4 },
  { id: "1samuel", name: "1 Samuel", chapters: 31 },
  { id: "2samuel", name: "2 Samuel", chapters: 24 },
  { id: "1kings", name: "1 Kings", chapters: 22 },
  { id: "2kings", name: "2 Kings", chapters: 25 },
  { id: "1chronicles", name: "1 Chronicles", chapters: 29 },
  { id: "2chronicles", name: "2 Chronicles", chapters: 36 },
  { id: "ezra", name: "Ezra", chapters: 10 },
  { id: "nehemiah", name: "Nehemiah", chapters: 13 },
  { id: "esther", name: "Esther", chapters: 10 },
  { id: "job", name: "Job", chapters: 42 },
  { id: "psalms", name: "Psalms", chapters: 150 },
  { id: "proverbs", name: "Proverbs", chapters: 31 },
  { id: "ecclesiastes", name: "Ecclesiastes", chapters: 12 },
  { id: "songofsolomon", name: "Song of Solomon", chapters: 8 },
  { id: "isaiah", name: "Isaiah", chapters: 66 },
  { id: "jeremiah", name: "Jeremiah", chapters: 52 },
  { id: "lamentations", name: "Lamentations", chapters: 5 },
  { id: "ezekiel", name: "Ezekiel", chapters: 48 },
  { id: "daniel", name: "Daniel", chapters: 12 },
  { id: "hosea", name: "Hosea", chapters: 14 },
  { id: "joel", name: "Joel", chapters: 3 },
  { id: "amos", name: "Amos", chapters: 9 },
  { id: "obadiah", name: "Obadiah", chapters: 1 },
  { id: "jonah", name: "Jonah", chapters: 4 },
  { id: "micah", name: "Micah", chapters: 7 },
  { id: "nahum", name: "Nahum", chapters: 3 },
  { id: "habakkuk", name: "Habakkuk", chapters: 3 },
  { id: "zephaniah", name: "Zephaniah", chapters: 3 },
  { id: "haggai", name: "Haggai", chapters: 2 },
  { id: "zechariah", name: "Zechariah", chapters: 14 },
  { id: "malachi", name: "Malachi", chapters: 4 },
  { id: "matthew", name: "Matthew", chapters: 28 },
  { id: "mark", name: "Mark", chapters: 16 },
  { id: "luke", name: "Luke", chapters: 24 },
  { id: "john", name: "John", chapters: 21 },
  { id: "acts", name: "Acts", chapters: 28 },
  { id: "romans", name: "Romans", chapters: 16 },
  { id: "1corinthians", name: "1 Corinthians", chapters: 16 },
  { id: "2corinthians", name: "2 Corinthians", chapters: 13 },
  { id: "galatians", name: "Galatians", chapters: 6 },
  { id: "ephesians", name: "Ephesians", chapters: 6 },
  { id: "philippians", name: "Philippians", chapters: 4 },
  { id: "colossians", name: "Colossians", chapters: 4 },
  { id: "1thessalonians", name: "1 Thessalonians", chapters: 5 },
  { id: "2thessalonians", name: "2 Thessalonians", chapters: 3 },
  { id: "1timothy", name: "1 Timothy", chapters: 6 },
  { id: "2timothy", name: "2 Timothy", chapters: 4 },
  { id: "titus", name: "Titus", chapters: 3 },
  { id: "philemon", name: "Philemon", chapters: 1 },
  { id: "hebrews", name: "Hebrews", chapters: 13 },
  { id: "james", name: "James", chapters: 5 },
  { id: "1peter", name: "1 Peter", chapters: 5 },
  { id: "2peter", name: "2 Peter", chapters: 3 },
  { id: "1john", name: "1 John", chapters: 5 },
  { id: "2john", name: "2 John", chapters: 1 },
  { id: "3john", name: "3 John", chapters: 1 },
  { id: "jude", name: "Jude", chapters: 1 },
  { id: "revelation", name: "Revelation", chapters: 22 },
];

// Mock data for Bible verses
const getMockVerses = (count: number): BibleVerse[] => {
  const verses: BibleVerse[] = [];
  for (let i = 1; i <= count; i++) {
    verses.push({
      verse: i,
      text: `This is verse ${i} of the selected chapter. This is sample text to demonstrate how verses would appear in the Bible view component.`,
    });
  }
  return verses;
};

const BibleViewNative: React.FC = () => {
  const { openRightPanel } = useUI();
  const [selectedTranslation, setSelectedTranslation] =
    useState<BibleTranslation>(translations[0]);
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [expandedBooks, setExpandedBooks] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentChapter, setCurrentChapter] = useState<BibleChapter | null>(
    null,
  );
  const [selectedVerses, setSelectedVerses] = useState<number[]>([]);
  const [showTranslations, setShowTranslations] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "reading">("reading");

  // Filter books based on search query
  const filteredBooks = bibleBooks.filter((book) =>
    book.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Toggle book expansion
  const toggleBookExpansion = (bookId: string) => {
    setExpandedBooks((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId],
    );
  };

  // Select a book
  const handleBookSelect = (book: BibleBook) => {
    setSelectedBook(book);
    if (!expandedBooks.includes(book.id)) {
      toggleBookExpansion(book.id);
    }
  };

  // Select a chapter
  const handleChapterSelect = (chapter: number) => {
    setSelectedChapter(chapter);

    // In a real app, you would fetch the verses from an API
    // For now, we'll use mock data
    setCurrentChapter({
      book: selectedBook?.name || "",
      chapter: chapter,
      verses: getMockVerses(25), // Most chapters have around 20-30 verses
    });

    // Reset selected verses
    setSelectedVerses([]);
  };

  // Navigate to previous/next chapter
  const navigateChapter = (direction: "prev" | "next") => {
    if (!selectedBook || !selectedChapter) return;

    if (direction === "prev") {
      if (selectedChapter > 1) {
        handleChapterSelect(selectedChapter - 1);
      } else {
        // Go to previous book, last chapter
        const currentBookIndex = bibleBooks.findIndex(
          (b) => b.id === selectedBook.id,
        );
        if (currentBookIndex > 0) {
          const prevBook = bibleBooks[currentBookIndex - 1];
          setSelectedBook(prevBook);
          handleChapterSelect(prevBook.chapters);
        }
      }
    } else {
      if (selectedChapter < selectedBook.chapters) {
        handleChapterSelect(selectedChapter + 1);
      } else {
        // Go to next book, first chapter
        const currentBookIndex = bibleBooks.findIndex(
          (b) => b.id === selectedBook.id,
        );
        if (currentBookIndex < bibleBooks.length - 1) {
          const nextBook = bibleBooks[currentBookIndex + 1];
          setSelectedBook(nextBook);
          handleChapterSelect(1);
        }
      }
    }
  };

  // Toggle verse selection
  const toggleVerseSelection = (verseNumber: number) => {
    setSelectedVerses((prev) =>
      prev.includes(verseNumber)
        ? prev.filter((v) => v !== verseNumber)
        : [...prev, verseNumber],
    );
  };

  // Add selected verses to presentation
  const addVersesToPresentation = () => {
    if (selectedVerses.length === 0 || !currentChapter) return;

    const selectedVerseTexts = currentChapter.verses
      .filter((verse) => selectedVerses.includes(verse.verse))
      .map((verse) => `${verse.verse}. ${verse.text}`);

    // Here you would add these verses to your presentation
    // For now, we'll just log them
    console.log("Adding verses to presentation:", {
      reference: `${currentChapter.book} ${currentChapter.chapter}:${selectedVerses.join(", ")}`,
      translation: selectedTranslation.abbreviation,
      verses: selectedVerseTexts,
    });

    // Open the slide editor panel
    openRightPanel("slide-editor");
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
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Bible</span>
          </Button>

          <div className="h-4 w-px bg-neutral-700 mx-1"></div>

          {/* Translation selector */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTranslations(!showTranslations)}
              className="flex items-center gap-1"
            >
              {selectedTranslation.abbreviation}
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </Button>

            {showTranslations && (
              <Card
                variant="glass"
                className="absolute left-0 top-full mt-1 w-64 z-10 bg-neutral-800 border border-neutral-700"
              >
                <CardContent className="p-2 max-h-80 overflow-y-auto">
                  {translations.map((translation) => (
                    <Button
                      key={translation.id}
                      variant="ghost"
                      className={`w-full justify-start px-3 py-2 h-auto ${selectedTranslation.id === translation.id ? "bg-blue-500/20 text-blue-400" : "text-neutral-300 hover:bg-neutral-700"}`}
                      onClick={() => {
                        setSelectedTranslation(translation);
                        setShowTranslations(false);
                      }}
                    >
                      <div className="flex flex-col items-start">
                        <div className="font-medium">
                          {translation.abbreviation}
                        </div>
                        <div className="text-xs text-neutral-500">
                          {translation.name}
                        </div>
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {currentChapter && (
            <>
              <div className="h-4 w-px bg-neutral-700 mx-1"></div>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => navigateChapter("prev")}
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>

                <span className="text-sm font-medium text-white">
                  {currentChapter.book} {currentChapter.chapter}
                </span>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => navigateChapter("next")}
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-1">
          {/* View mode toggle */}
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${viewMode === "reading" ? "text-blue-400" : ""}`}
            onClick={() => setViewMode("reading")}
          >
            <BookOpen className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${viewMode === "list" ? "text-blue-400" : ""}`}
            onClick={() => setViewMode("list")}
          >
            <List className="w-4 h-4" />
          </Button>

          <div className="h-4 w-px bg-neutral-700 mx-1"></div>

          {/* Actions */}
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Copy className="w-4 h-4" />
          </Button>

          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Printer className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setShowBookmarks(!showBookmarks)}
          >
            <Bookmark className="w-4 h-4" />
          </Button>

          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Bible navigation sidebar */}
        <div className="w-64 border-r border-neutral-800 flex flex-col bg-neutral-800/50">
          {/* Search bar */}
          <div className="p-2 border-b border-neutral-800">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search books..."
                className="pl-9 bg-neutral-700/50 border-neutral-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-500" />
            </div>
          </div>

          {/* Books list */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-1">
            {filteredBooks.map((book) => (
              <div key={book.id} className="mb-0.5">
                <Button
                  variant="ghost"
                  className={`flex items-center justify-between w-full px-2 py-1.5 h-auto text-left ${selectedBook?.id === book.id ? "bg-neutral-700 text-white" : "text-neutral-400 hover:text-white hover:bg-neutral-700/50"}`}
                  onClick={() => handleBookSelect(book)}
                >
                  <div className="flex items-center gap-2">
                    <Book className="w-4 h-4" />
                    <span className="text-sm">{book.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="p-0.5 h-5 w-5 rounded-sm hover:bg-neutral-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookExpansion(book.id);
                    }}
                  >
                    {expandedBooks.includes(book.id) ? (
                      <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                    )}
                  </Button>
                </Button>

                {/* Chapters */}
                {expandedBooks.includes(book.id) && (
                  <div className="ml-6 mt-1 grid grid-cols-5 gap-1 pr-2">
                    {Array.from({ length: book.chapters }, (_, i) => i + 1).map(
                      (chapter) => (
                        <Button
                          key={chapter}
                          variant={
                            selectedBook?.id === book.id &&
                            selectedChapter === chapter
                              ? "primary"
                              : "secondary"
                          }
                          size="xs"
                          className="w-full p-1 text-xs"
                          onClick={() => handleChapterSelect(chapter)}
                        >
                          {chapter}
                        </Button>
                      ),
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bible content area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-neutral-900">
          {currentChapter ? (
            <>
              {/* Verses */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                {viewMode === "reading" ? (
                  <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-semibold text-white mb-4">
                      {currentChapter.book} {currentChapter.chapter}
                    </h2>
                    <div className="prose prose-invert prose-lg max-w-none">
                      {currentChapter.verses.map((verse) => (
                        <span
                          key={verse.verse}
                          className={`relative group ${selectedVerses.includes(verse.verse) ? "bg-blue-500/20 text-blue-100" : ""}`}
                          onClick={() => toggleVerseSelection(verse.verse)}
                        >
                          <sup className="text-blue-400 font-medium mr-1">
                            {verse.verse}
                          </sup>
                          {verse.text}{" "}
                          <span className="absolute -left-6 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-5 w-5 text-neutral-500 hover:text-white"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleVerseSelection(verse.verse);
                              }}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 max-w-3xl mx-auto">
                    <h2 className="text-2xl font-semibold text-white mb-4">
                      {currentChapter.book} {currentChapter.chapter}
                    </h2>
                    {currentChapter.verses.map((verse) => (
                      <Card
                        key={verse.verse}
                        variant={
                          selectedVerses.includes(verse.verse)
                            ? "outline"
                            : "default"
                        }
                        className={`cursor-pointer ${selectedVerses.includes(verse.verse) ? "bg-blue-500/10 border-blue-500/30" : "hover:bg-neutral-800"}`}
                        onClick={() => toggleVerseSelection(verse.verse)}
                      >
                        <CardContent className="p-3">
                          <div className="flex">
                            <span className="text-blue-400 font-medium mr-3 w-6 flex-shrink-0">
                              {verse.verse}
                            </span>
                            <p className="text-neutral-200">{verse.text}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* Action bar */}
              {selectedVerses.length > 0 && (
                <div className="p-3 border-t border-neutral-800 bg-neutral-800/80 backdrop-blur-sm">
                  <div className="flex items-center justify-between max-w-3xl mx-auto">
                    <div className="text-sm text-neutral-400">
                      {selectedVerses.length} verse
                      {selectedVerses.length !== 1 ? "s" : ""} selected
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="flex items-center gap-1.5"
                        onClick={() => setSelectedVerses([])}
                      >
                        Clear
                      </Button>

                      <Button
                        variant="primary"
                        size="sm"
                        onClick={addVersesToPresentation}
                        className="flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Presentation</span>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <BookOpen className="w-16 h-16 text-neutral-700 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">
                  Select a Book and Chapter
                </h3>
                <p className="text-neutral-400 max-w-md">
                  Choose a book from the sidebar and select a chapter to view
                  its verses.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bookmarks panel (conditionally shown) */}
        {showBookmarks && (
          <div className="w-64 border-l border-neutral-800 bg-neutral-800/50 flex flex-col">
            <div className="p-3 border-b border-neutral-800 flex items-center justify-between">
              <h3 className="text-sm font-medium text-white">Bookmarks</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setShowBookmarks(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              <div className="text-center text-neutral-500 py-8">
                <Bookmark className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">No bookmarks yet</p>
                <p className="text-xs mt-1">
                  Bookmark verses to access them quickly
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BibleViewNative;
