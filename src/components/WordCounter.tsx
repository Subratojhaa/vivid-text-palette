
import { useEffect, useState } from 'react';

interface WordCounterProps {
  content: string;
}

const WordCounter = ({ content }: WordCounterProps) => {
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
    paragraphs: 0,
    capitals: 0,
    numbers: 0,
    hashtags: 0,
    quotes: 0,
    dates: 0
  });

  useEffect(() => {
    // Extract plain text from HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const plainText = tempDiv.textContent || tempDiv.innerText || '';

    const words = plainText.trim() ? plainText.trim().split(/\s+/).length : 0;
    const characters = plainText.length;
    const charactersNoSpaces = plainText.replace(/\s/g, '').length;
    const paragraphs = plainText.trim() ? plainText.split(/\n\s*\n/).length : 0;

    // Count highlighted elements
    const capitals = (plainText.match(/\b[A-Z][a-zA-Z]*\b/g) || []).length;
    const numbers = (plainText.match(/\b\d+(?:\.\d+)?\b/g) || []).length;
    const hashtags = (plainText.match(/\B#[a-zA-Z0-9_]+/g) || []).length;
    const quotes = (plainText.match(/"[^"]+"/g) || []).length;
    const dates = (plainText.match(/\b\d{1,2}-\d{1,2}-\d{4}\b/g) || []).length;

    setStats({
      words,
      characters,
      charactersNoSpaces,
      paragraphs,
      capitals,
      numbers,
      hashtags,
      quotes,
      dates
    });
  }, [content]);

  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-lg border border-border p-3 text-xs">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-muted-foreground">
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{stats.words}</span>
          <span>Words</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{stats.characters}</span>
          <span>Characters</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{stats.paragraphs}</span>
          <span>Paragraphs</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{stats.charactersNoSpaces}</span>
          <span>Chars (no spaces)</span>
        </div>
      </div>
      
      <div className="mt-2 pt-2 border-t border-border grid grid-cols-5 gap-2">
        <div className="flex flex-col items-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full mb-1"></div>
          <span className="font-medium text-foreground">{stats.capitals}</span>
          <span className="text-[10px]">Capitals</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mb-1"></div>
          <span className="font-medium text-foreground">{stats.numbers}</span>
          <span className="text-[10px]">Numbers</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-2 h-2 bg-orange-500 rounded-full mb-1"></div>
          <span className="font-medium text-foreground">{stats.quotes}</span>
          <span className="text-[10px]">Quotes</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-2 h-2 bg-purple-500 rounded-full mb-1"></div>
          <span className="font-medium text-foreground">{stats.hashtags}</span>
          <span className="text-[10px]">Hashtags</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-2 h-2 bg-red-500 rounded-full mb-1"></div>
          <span className="font-medium text-foreground">{stats.dates}</span>
          <span className="text-[10px]">Dates</span>
        </div>
      </div>
    </div>
  );
};

export default WordCounter;
