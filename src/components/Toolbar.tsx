
import { Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ToolbarProps {
  onClear: () => void;
  onDownload: () => void;
}

const Toolbar = ({ onClear, onDownload }: ToolbarProps) => {
  return (
    <div className="flex items-center space-x-3">
      <Button
        onClick={onClear}
        variant="outline"
        size="sm"
        className="bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-red-500/20 hover:border-red-500 hover:text-red-400 transition-all duration-200"
      >
        <Trash2 className="w-4 h-4 mr-2" />
        Clear
      </Button>
      
      <Button
        onClick={onDownload}
        size="sm"
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        <Download className="w-4 h-4 mr-2" />
        Download
      </Button>
    </div>
  );
};

export default Toolbar;
