export const highlightCode = (code: string, language: string = 'typescript'): string => {
  // Simple syntax highlighting implementation
  // In a real project, you might use Prism.js or highlight.js
  
  const keywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'import', 'export', 'default', 'class', 'extends', 'interface', 'type'];
  const jsxTags = ['div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'button', 'input', 'form', 'label', 'select', 'option', 'textarea'];
  
  let highlighted = code
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
  
  // Highlight keywords
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'g');
    highlighted = highlighted.replace(regex, `<span class="text-purple-600">${keyword}</span>`);
  });
  
  // Highlight strings
  highlighted = highlighted.replace(/&quot;([^&]*)&quot;/g, '<span class="text-green-600">&quot;$1&quot;</span>');
  highlighted = highlighted.replace(/&#39;([^&]*)&#39;/g, '<span class="text-green-600">&#39;$1&#39;</span>');
  
  // Highlight numbers
  highlighted = highlighted.replace(/\b\d+\b/g, '<span class="text-blue-600">$&</span>');
  
  // Highlight JSX tags
  jsxTags.forEach(tag => {
    const regex = new RegExp(`&lt;${tag}(&gt;|\\s)`, 'g');
    highlighted = highlighted.replace(regex, `<span class="text-blue-600">&lt;${tag}</span>$1`);
    const closeRegex = new RegExp(`&lt;/${tag}&gt;`, 'g');
    highlighted = highlighted.replace(closeRegex, `<span class="text-blue-600">&lt;/${tag}&gt;</span>`);
  });
  
  return highlighted;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
};