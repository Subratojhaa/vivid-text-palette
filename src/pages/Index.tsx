
import { useState, useRef, useEffect } from 'react';
import TextEditor from '../components/TextEditor';
import Toolbar from '../components/Toolbar';

const Index = () => {
  const [content, setContent] = useState('');
  const editorRef = useRef<HTMLDivElement>(null);

  const handleClear = () => {
    setContent('');
    if (editorRef.current) {
      editorRef.current.innerHTML = '';
      editorRef.current.focus();
    }
  };

  const handleDownload = () => {
    // Extract plain text from HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const plainText = tempDiv.textContent || tempDiv.innerText || '';
    
    const blob = new Blob([plainText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'colorpad-note.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-6 h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ColorPad
            </h1>
          </div>
          <Toolbar onClear={handleClear} onDownload={handleDownload} />
        </div>

        {/* Editor */}
        <div className="flex-1 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
          <TextEditor
            ref={editorRef}
            content={content}
            setContent={setContent}
          />
        </div>

        {/* Footer */}
        <div className="mt-4 text-center text-slate-400 text-sm">
          <p>Type and watch your text come alive with colors! 🎨</p>
          <div className="mt-2 flex flex-wrap justify-center gap-4 text-xs">
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              Capitals
            </span>
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              Numbers
            </span>
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              Quotes
            </span>
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              Hashtags
            </span>
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              Dates
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
