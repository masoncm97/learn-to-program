import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = forwardRef(({ onCodeChange, defaultCode }, ref) => {
  const editorRef = useRef(null);
  const [code, setCode] = useState(defaultCode);

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    getCurrentCode: () => {
      return editorRef.current ? editorRef.current.getValue() : code;
    }
  }));

  // Update internal state when defaultCode prop changes
  useEffect(() => {
    setCode(defaultCode);
    if (editorRef.current) {
      editorRef.current.setValue(defaultCode);
    }
  }, [defaultCode]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Set up Monaco editor options
    editor.updateOptions({
      minimap: { enabled: true },
      lineNumbers: 'on',
      fontSize: 14,
      theme: 'vs-dark',
      automaticLayout: true,
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      suggestOnTriggerCharacters: true,
      quickSuggestions: true,
      parameterHints: { enabled: true },
      hover: { enabled: true },
      contextmenu: true,
      folding: true,
      foldingStrategy: 'indentation',
      showFoldingControls: 'always',
      foldingHighlight: true,
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      cursorStyle: 'line',
      automaticLayout: true,
      scrollbar: {
        useShadows: false,
        verticalHasArrows: true,
        horizontalHasArrows: true,
        vertical: 'visible',
        horizontal: 'visible',
        verticalScrollbarSize: 17,
        horizontalScrollbarSize: 17,
        arrowSize: 30
      }
    });

    // Add JavaScript language features
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });

    // Add custom snippets for Snake class
    monaco.languages.registerCompletionItemProvider('javascript', {
      provideCompletionItems: () => {
        return {
          suggestions: [
            {
              label: 'new Snake',
              kind: monaco.languages.CompletionItemKind.Constructor,
              insertText: 'new Snake(${1:x}, ${2:y})',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Create a new snake at position (x, y)'
            },
            {
              label: 'setColor',
              kind: monaco.languages.CompletionItemKind.Method,
              insertText: 'setColor(\'${1:color}\')',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Set the snake color (e.g., \'red\', \'#00ff00\')'
            },
            {
              label: 'setSpeed',
              kind: monaco.languages.CompletionItemKind.Method,
              insertText: 'setSpeed(${1:speed})',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Set the snake movement speed (0.1 to 10)'
            },
            {
              label: 'move',
              kind: monaco.languages.CompletionItemKind.Method,
              insertText: 'move(\'${1:direction}\')',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Move snake in direction (\'up\', \'down\', \'left\', \'right\')'
            },
            {
              label: 'new BouncingBall',
              kind: monaco.languages.CompletionItemKind.Constructor,
              insertText: 'new BouncingBall(${1:x}, ${2:y}, ${3:radius})',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Create a new bouncing ball at position (x, y) with radius'
            },
            {
              label: 'setVelocity',
              kind: monaco.languages.CompletionItemKind.Method,
              insertText: 'setVelocity(${1:vx}, ${2:vy})',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Set the ball velocity (x, y)'
            },
            {
              label: 'setBounce',
              kind: monaco.languages.CompletionItemKind.Method,
              insertText: 'setBounce(${1:bounciness})',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Set the ball bounce factor (0 to 1)'
            },
            {
              label: 'setGravity',
              kind: monaco.languages.CompletionItemKind.Method,
              insertText: 'setGravity(${1:gravity})',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Set the ball gravity (downward acceleration)'
            }
          ]
        };
      }
    });
  };

  const handleEditorChange = (value) => {
    setCode(value);
    onCodeChange(value);
  };

  return (
    <div className="h-full bg-gray-900 rounded-lg overflow-hidden flex flex-col">
      <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
        <h3 className="text-white font-medium">Code Editor</h3>
      </div>
      <div className="flex-1 h-full min-h-0">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          value={code}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: true },
            lineNumbers: 'on',
            fontSize: 14,
            theme: 'vs-dark',
            automaticLayout: true,
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            parameterHints: { enabled: true },
            hover: { enabled: true },
            contextmenu: true,
            folding: true,
            foldingStrategy: 'indentation',
            showFoldingControls: 'always',
            foldingHighlight: true,
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: false,
            cursorStyle: 'line',
            scrollbar: {
              useShadows: false,
              verticalHasArrows: true,
              horizontalHasArrows: true,
              vertical: 'visible',
              horizontal: 'visible',
              verticalScrollbarSize: 17,
              horizontalScrollbarSize: 17,
              arrowSize: 30
            }
          }}
        />
      </div>
    </div>
  );
});

export default CodeEditor; 