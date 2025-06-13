
import { useState, useRef, useEffect } from 'react';
import TextEditor from '../components/TextEditor';
import Toolbar from '../components/Toolbar';
import ColorLegend from '../components/ColorLegend';
import WordCounter from '../components/WordCounter';
import { ThemeProvider } from '../contexts/ThemeContext';

const IndexContent = () => {
  const [content, setContent] = useState('');
  const [showLegend, setShowLegend] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  // Auto-save to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('colorpad-content');
    if (saved) {
      setContent(saved);
      if (editorRef.current) {
        editorRef.current.innerHTML = saved;
      }
    }
  }, []);

  useEffect(() => {
    if (content !== '') {
      localStorage.setItem('colorpad-content', content);
    }
  }, [content]);

  const handleClear = () => {
    setContent('');
    localStorage.removeItem('colorpad-content');
    if (editorRef.current) {
      editorRef.current.innerHTML = '';
      editorRef.current.focus();
    }
  };

  const handleDownload = (format: 'txt' | 'md') => {
    // Extract plain text from HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const plainText = tempDiv.textContent || tempDiv.innerText || '';
    
    const mimeType = format === 'md' ? 'text/markdown' : 'text/plain';
    const blob = new Blob([plainText], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `colorpad-note.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = (importedContent: string) => {
    setContent(importedContent);
    if (editorRef.current) {
      editorRef.current.innerText = importedContent;
      // Trigger highlighting
      const inputEvent = new Event('input', { bubbles: true });
      editorRef.current.dispatchEvent(inputEvent);
      editorRef.current.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background transition-colors duration-500">
      <div className="container mx-auto px-2 py-2 h-screen flex flex-col">
        {/* Compact Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">C</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ColorPad
            </h1>
          </div>
          <Toolbar onClear={handleClear} onDownload={handleDownload} onImport={handleImport} />
        </div>

        {/* Main Editor - Much Larger */}
        <div className="flex-1 bg-card/50 backdrop-blur-sm rounded-xl border border-border shadow-xl overflow-hidden">
          <TextEditor
            ref={editorRef}
            content={content}
            setContent={setContent}
          />
        </div>

        {/* Minimal Footer with Compact Stats */}
        <div className="mt-2 space-y-1">
          <div className="flex items-center justify-between">
            <WordCounter content={content} />
            
            {/* Compact Color Legend */}
            <div className="flex flex-wrap gap-2 text-xs opacity-70">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Capitals
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Numbers
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                Quotes
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Hashtags
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                Dates
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Color Legend */}
      <ColorLegend 
        isVisible={showLegend} 
        onToggle={() => setShowLegend(!showLegend)} 
      />
    </div>
  );
};

const Index = () => {
  return (
    <ThemeProvider>
      <IndexContent />
    </ThemeProvider>
  );
};

export default Index;
