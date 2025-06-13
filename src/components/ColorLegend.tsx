
import { X, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ColorLegendProps {
  isVisible: boolean;
  onToggle: () => void;
}

const ColorLegend = ({ isVisible, onToggle }: ColorLegendProps) => {
  if (!isVisible) {
    return (
      <Button
        onClick={onToggle}
        size="sm"
        variant="outline"
        className="fixed bottom-6 right-6 bg-slate-800/80 border-slate-600 text-slate-300 hover:bg-slate-700 backdrop-blur-sm z-50"
      >
        <Info className="w-4 h-4 mr-2" />
        Legend
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 bg-slate-800/95 backdrop-blur-sm border border-slate-600 rounded-xl p-4 shadow-2xl z-50 min-w-64">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-slate-200 font-semibold text-sm">Color Legend</h3>
        <Button
          onClick={onToggle}
          size="sm"
          variant="ghost"
          className="h-6 w-6 p-0 text-slate-400 hover:text-slate-200"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-slate-300">Capital words</span>
          <span className="highlight-capital text-xs">Example</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-slate-300">Numbers</span>
          <span className="highlight-number text-xs">123</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span className="text-slate-300">Quotes</span>
          <span className="highlight-quote text-xs">"text"</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <span className="text-slate-300">Hashtags</span>
          <span className="highlight-hashtag text-xs">#tag</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-slate-300">Dates</span>
          <span className="highlight-date text-xs">25-12-2024</span>
        </div>
      </div>
    </div>
  );
};

export default ColorLegend;
