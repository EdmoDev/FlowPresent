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

const BibleViewRedesigned: React.FC = () => {
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
    <div className="flex flex-col h-full bg-neutral-800/50">
      {/* Header with search and translation selector */}
      <Card
        variant="glass"
        padding="none"
        className="rounded-none border-x-0 border-t-0"
      >
        <CardHeader className="flex flex-row items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-accent-blue" />
            <CardTitle className="text-lg">Bible</CardTitle>
          </div>

          <div className="flex items-center gap-2">
            {/* Translation selector */}
            <div className="relative">
              <Button
                variant="glass"
                size="sm"
                onClick={() => setShowTranslations(!showTranslations)}
                className="flex items-center gap-1"
              >
                {selectedTranslation.abbreviation}
                <ChevronDown className="w-3.5 h-3.5 text-text-secondary" />
              </Button>

              {showTranslations && (
                <Card
                  variant="glass"
                  className="absolute right-0 top-full mt-1 w-64 z-10"
                >
                  <CardContent className="p-2">
                    {translations.map((translation) => (
                      <Button
                        key={translation.id}
                        variant="ghost"
                        className={`w-full justify-start px-3 py-2 h-auto ${selectedTranslation.id === translation.id ? "bg-accent-blue/10 text-accent-blue" : "text-text-primary"}`}
                        onClick={() => {
                          setSelectedTranslation(translation);
                          setShowTranslations(false);
                        }}
                      >
                        <div className="flex flex-col items-start">
                          <div className="font-medium">
                            {translation.abbreviation}
                          </div>
                          <div className="text-xs text-text-secondary">
                            {translation.name}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="flex flex-1 overflow-hidden">
        {/* Bible navigation sidebar */}
        <Card
          variant="glass"
          className="w-64 rounded-none border-t-0 border-b-0 border-l-0 flex flex-col"
        >
          {/* Search bar */}
          <CardContent className="p-3 border-b border-white/10">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search books..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-500" />
            </div>
          </CardContent>

          {/* Books list */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
            {filteredBooks.map((book) => (
              <div key={book.id} className="mb-1">
                <Button
                  variant="ghost"
                  className={`flex items-center justify-between w-full px-3 py-2 h-auto ${selectedBook?.id === book.id ? "bg-accent-blue/10 text-accent-blue" : "text-text-primary"}`}
                  onClick={() => handleBookSelect(book)}
                >
                  <div className="flex items-center gap-2">
                    <Book className="w-4 h-4" />
                    <span className="text-sm font-medium">{book.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="p-1 h-auto w-auto rounded-full hover:bg-white/5"
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
                  </Button>
                </Button>

                {/* Chapters */}
                {expandedBooks.includes(book.id) && (
                  <div className="ml-6 mt-1 grid grid-cols-5 gap-1">
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
                          className="w-full p-1.5 text-xs"
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
        </Card>

        {/* Bible content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {currentChapter ? (
            <>
              {/* Chapter header */}
              <Card
                variant="glass"
                padding="none"
                className="rounded-none border-x-0 border-t-0"
              >
                <CardHeader className="flex flex-row items-center justify-between py-3">
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
                      <Button
                        variant="ghost"
                        size="icon"
                        className="p-1.5 h-auto w-auto"
                      >
                        <Bookmark className="w-4 h-4 text-text-secondary" />
                      </Button>
                    </Tooltip>

                    <Tooltip content="Share" position="top">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="p-1.5 h-auto w-auto"
                      >
                        <Share2 className="w-4 h-4 text-text-secondary" />
                      </Button>
                    </Tooltip>

                    <Tooltip content="Download" position="top">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="p-1.5 h-auto w-auto"
                      >
                        <Download className="w-4 h-4 text-text-secondary" />
                      </Button>
                    </Tooltip>
                  </div>
                </CardHeader>
              </Card>

              {/* Verses */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                {currentChapter.verses.map((verse) => (
                  <Card
                    key={verse.verse}
                    variant={
                      selectedVerses.includes(verse.verse)
                        ? "outline"
                        : "default"
                    }
                    className={`mb-4 cursor-pointer ${selectedVerses.includes(verse.verse) ? "bg-accent-blue/10 border-accent-blue/30" : "hover:bg-white/5"}`}
                    onClick={() => toggleVerseSelection(verse.verse)}
                  >
                    <CardContent className="p-3">
                      <div className="flex">
                        <span className="text-accent-blue font-medium mr-3">
                          {verse.verse}
                        </span>
                        <p className="text-text-primary flex-1">{verse.text}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Action bar */}
              <Card
                variant="glass"
                padding="none"
                className="rounded-none border-x-0 border-b-0"
              >
                <CardContent className="flex items-center justify-between py-3 px-4">
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

                  <Button
                    variant={selectedVerses.length > 0 ? "primary" : "ghost"}
                    size="sm"
                    disabled={selectedVerses.length === 0}
                    onClick={addVersesToPresentation}
                    className="flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Presentation</span>
                  </Button>
                </CardContent>
              </Card>
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

export default BibleViewRedesigned;
