
import { forwardRef, useEffect, useCallback } from 'react';

interface TextEditorProps {
  content: string;
  setContent: (content: string) => void;
}

const TextEditor = forwardRef<HTMLDivElement, TextEditorProps>(
  ({ content, setContent }, ref) => {
    const highlightText = useCallback((text: string): string => {
      if (!text) return text;

      // Store the original text to avoid double-processing
      let processedText = text;

      // Remove existing spans to avoid nesting
      processedText = processedText.replace(/<span[^>]*>/g, '').replace(/<\/span>/g, '');

      // Apply highlighting in order of priority
      // 1. Dates (dd-mm-yyyy format)
      processedText = processedText.replace(
        /\b(\d{1,2}-\d{1,2}-\d{4})\b/g,
        '<span class="highlight-date">$1</span>'
      );

      // 2. Text inside double quotes
      processedText = processedText.replace(
        /"([^"]+)"/g,
        '<span class="highlight-quote">"$1"</span>'
      );

      // 3. Hashtags
      processedText = processedText.replace(
        /\B(#[a-zA-Z0-9_]+)/g,
        '<span class="highlight-hashtag">$1</span>'
      );

      // 4. Numbers (not part of dates or other patterns)
      processedText = processedText.replace(
        /\b(\d+(?:\.\d+)?)\b(?![^<]*<\/span>)/g,
        '<span class="highlight-number">$1</span>'
      );

      // 5. Words starting with capital letters (not already wrapped)
      processedText = processedText.replace(
        /\b([A-Z][a-zA-Z]*)\b(?![^<]*<\/span>)/g,
        '<span class="highlight-capital">$1</span>'
      );

      return processedText;
    }, []);

    const handleInput = useCallback((e: React.FormEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement;
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      const cursorPosition = range?.startOffset || 0;
      const cursorNode = range?.startContainer;

      // Get plain text content
      const plainText = target.innerText || '';
      
      // Apply highlighting
      const highlightedContent = highlightText(plainText);
      
      // Update content
      setContent(highlightedContent);
      target.innerHTML = highlightedContent;

      // Restore cursor position
      try {
        if (selection && cursorNode) {
          const newRange = document.createRange();
          const walker = document.createTreeWalker(
            target,
            NodeFilter.SHOW_TEXT,
            null
          );

          let currentPos = 0;
          let targetNode = null;
          let node;

          while (node = walker.nextNode()) {
            const nodeLength = node.textContent?.length || 0;
            if (currentPos + nodeLength >= cursorPosition) {
              targetNode = node;
              break;
            }
            currentPos += nodeLength;
          }

          if (targetNode) {
            const offset = cursorPosition - currentPos;
            newRange.setStart(targetNode, Math.min(offset, targetNode.textContent?.length || 0));
            newRange.setEnd(targetNode, Math.min(offset, targetNode.textContent?.length || 0));
            selection.removeAllRanges();
            selection.addRange(newRange);
          }
        }
      } catch (error) {
        console.log('Cursor position restoration failed:', error);
      }
    }, [highlightText, setContent]);

    const handlePaste = useCallback((e: React.ClipboardEvent<HTMLDivElement>) => {
      e.preventDefault();
      const text = e.clipboardData.getData('text/plain');
      const selection = window.getSelection();
      
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(text));
        range.collapse(false);
        
        // Trigger input event to apply highlighting
        const inputEvent = new Event('input', { bubbles: true });
        e.currentTarget.dispatchEvent(inputEvent);
      }
    }, []);

    useEffect(() => {
      if (ref && 'current' in ref && ref.current && !content) {
        ref.current.focus();
      }
    }, [ref, content]);

    return (
      <div className="h-full p-6">
        <div
          ref={ref}
          contentEditable
          onInput={handleInput}
          onPaste={handlePaste}
          className="w-full h-full bg-transparent text-slate-100 text-lg leading-relaxed outline-none resize-none placeholder:text-slate-500 overflow-auto"
          style={{ 
            minHeight: '100%',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}
          data-placeholder="Start typing your colorful notes here... Try capitals, numbers, #hashtags, dates like 25-12-2024, and words in 'quotes'!"
          suppressContentEditableWarning={true}
        />
      </div>
    );
  }
);

TextEditor.displayName = 'TextEditor';

export default TextEditor;
