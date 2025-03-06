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
} from "lucide-react";
import { Tooltip } from "../Tooltip";
import { useUI } from "../../contexts/UIContext";

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

const BibleView: React.FC = () => {
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
    <div className="flex flex-col h-full">
      {/* Header with search and translation selector */}
      <div className="px-4 py-3 border-b border-[var(--border-subtle)] bg-background-elevated flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-accent-blue" />
          <h2 className="text-lg font-medium text-text-primary">Bible</h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Translation selector */}
          <div className="relative">
            <button
              className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-background-glass/10 text-text-primary text-sm"
              onClick={() => setShowTranslations(!showTranslations)}
            >
              {selectedTranslation.abbreviation}
              <ChevronDown className="w-3.5 h-3.5 text-text-secondary" />
            </button>

            {showTranslations && (
              <div className="absolute right-0 top-full mt-1 w-64 bg-background-card border border-[var(--border-subtle)] rounded-md shadow-lg z-10">
                <div className="p-2">
                  {translations.map((translation) => (
                    <button
                      key={translation.id}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm ${selectedTranslation.id === translation.id ? "bg-accent-blue/10 text-accent-blue" : "text-text-primary hover:bg-background-glass/10"}`}
                      onClick={() => {
                        setSelectedTranslation(translation);
                        setShowTranslations(false);
                      }}
                    >
                      <div className="font-medium">
                        {translation.abbreviation}
                      </div>
                      <div className="text-xs text-text-secondary">
                        {translation.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Bible navigation sidebar */}
        <div className="w-64 border-r border-[var(--border-subtle)] flex flex-col">
          {/* Search bar */}
          <div className="p-3 border-b border-[var(--border-subtle)]">
            <div className="relative">
              <input
                type="text"
                placeholder="Search books..."
                className="glass-input w-full pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
            </div>
          </div>

          {/* Books list */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
            {filteredBooks.map((book) => (
              <div key={book.id} className="mb-1">
                <button
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-left ${selectedBook?.id === book.id ? "bg-accent-blue/10 text-accent-blue" : "text-text-primary hover:bg-background-glass/10"}`}
                  onClick={() => handleBookSelect(book)}
                >
                  <div className="flex items-center gap-2">
                    <Book className="w-4 h-4" />
                    <span className="text-sm font-medium">{book.name}</span>
                  </div>
                  <button
                    className="p-1 rounded-full hover:bg-background-glass/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookExpansion(book.id);
                    }}
                  >
                    {expandedBooks.includes(book.id) ? (
                      <ChevronDown className="w-3.5 h-3.5 text-text-secondary" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-text-secondary" />
                    )}
                  </button>
                </button>

                {/* Chapters */}
                {expandedBooks.includes(book.id) && (
                  <div className="ml-6 mt-1 grid grid-cols-5 gap-1">
                    {Array.from({ length: book.chapters }, (_, i) => i + 1).map(
                      (chapter) => (
                        <button
                          key={chapter}
                          className={`w-full p-1.5 text-xs rounded-md ${selectedBook?.id === book.id && selectedChapter === chapter ? "bg-accent-blue text-white" : "bg-background-glass/10 text-text-secondary hover:bg-background-glass/20"}`}
                          onClick={() => handleChapterSelect(chapter)}
                        >
                          {chapter}
                        </button>
                      ),
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bible content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {currentChapter ? (
            <>
              {/* Chapter header */}
              <div className="px-4 py-3 border-b border-[var(--border-subtle)] bg-background-elevated flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-text-primary">
                    {currentChapter.book} {currentChapter.chapter}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {selectedTranslation.name}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Tooltip content="Add to bookmarks" position="top">
                    <button className="p-1.5 rounded-md hover:bg-background-glass/10">
                      <Bookmark className="w-4 h-4 text-text-secondary" />
                    </button>
                  </Tooltip>

                  <Tooltip content="Share" position="top">
                    <button className="p-1.5 rounded-md hover:bg-background-glass/10">
                      <Share2 className="w-4 h-4 text-text-secondary" />
                    </button>
                  </Tooltip>

                  <Tooltip content="Download" position="top">
                    <button className="p-1.5 rounded-md hover:bg-background-glass/10">
                      <Download className="w-4 h-4 text-text-secondary" />
                    </button>
                  </Tooltip>
                </div>
              </div>

              {/* Verses */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                {currentChapter.verses.map((verse) => (
                  <div
                    key={verse.verse}
                    className={`mb-4 p-3 rounded-lg cursor-pointer ${selectedVerses.includes(verse.verse) ? "bg-accent-blue/10 border border-accent-blue/30" : "hover:bg-background-glass/10"}`}
                    onClick={() => toggleVerseSelection(verse.verse)}
                  >
                    <div className="flex">
                      <span className="text-accent-blue font-medium mr-3">
                        {verse.verse}
                      </span>
                      <p className="text-text-primary flex-1">{verse.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action bar */}
              <div className="px-4 py-3 border-t border-[var(--border-subtle)] bg-background-elevated flex items-center justify-between">
                <div className="text-sm text-text-secondary">
                  {selectedVerses.length > 0 ? (
                    <span>
                      {selectedVerses.length} verse
                      {selectedVerses.length !== 1 ? "s" : ""} selected
                    </span>
                  ) : (
                    <span>Select verses to add to presentation</span>
                  )}
                </div>

                <button
                  className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 ${selectedVerses.length > 0 ? "bg-accent-blue text-white" : "bg-background-glass/10 text-text-secondary cursor-not-allowed"}`}
                  disabled={selectedVerses.length === 0}
                  onClick={addVersesToPresentation}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span className="text-sm">Add to Presentation</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <BookOpen className="w-16 h-16 text-text-secondary/30 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">
                  Select a Book and Chapter
                </h3>
                <p className="text-text-secondary max-w-md">
                  Choose a book from the sidebar and select a chapter to view
                  its verses.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BibleView;
