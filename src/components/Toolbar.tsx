
import { Download, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import ThemeSwitcher from './ThemeSwitcher';

interface ToolbarProps {
  onClear: () => void;
  onDownload: (format: 'txt' | 'md') => void;
  onImport: (content: string) => void;
}

const Toolbar = ({ onClear, onDownload, onImport }: ToolbarProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'text/plain' || file.name.endsWith('.md') || file.name.endsWith('.txt'))) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onImport(content);
      };
      reader.readAsText(file);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <ThemeSwitcher />
      
      <div className="h-6 w-px bg-border"></div>
      
      <Button
        onClick={() => fileInputRef.current?.click()}
        variant="outline"
        size="sm"
        className="bg-card/50 border-border text-foreground hover:bg-accent"
      >
        <Upload className="w-4 h-4 mr-2" />
        Import
      </Button>
      
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.md"
        onChange={handleFileImport}
        className="hidden"
      />
      
      <Button
        onClick={onClear}
        variant="outline"
        size="sm"
        className="bg-card/50 border-border text-foreground hover:bg-destructive/20 hover:border-destructive hover:text-destructive"
      >
        <Trash2 className="w-4 h-4 mr-2" />
        Clear
      </Button>
      
      <div className="flex">
        <Button
          onClick={() => onDownload('txt')}
          size="sm"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-r-none"
        >
          <Download className="w-4 h-4 mr-2" />
          .txt
        </Button>
        <Button
          onClick={() => onDownload('md')}
          size="sm"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-l-none border-l border-purple-500"
        >
          .md
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
