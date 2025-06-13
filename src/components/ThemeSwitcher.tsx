
import { Sun, Moon, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: 'light' as const, icon: Sun, label: 'Light' },
    { id: 'dark' as const, icon: Moon, label: 'Dark' },
    { id: 'sepia' as const, icon: FileText, label: 'Sepia' }
  ];

  return (
    <div className="flex items-center space-x-1 bg-card/50 border border-border rounded-lg p-1">
      {themes.map(({ id, icon: Icon, label }) => (
        <Button
          key={id}
          onClick={() => setTheme(id)}
          variant={theme === id ? "default" : "ghost"}
          size="sm"
          className="h-8 w-8 p-0"
          title={label}
        >
          <Icon className="w-4 h-4" />
        </Button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
