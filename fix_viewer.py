from pathlib import Path
path = Path('src/components/ar/Food3DViewer.tsx')
text = path.read_text(encoding='utf-8')
if 'const ModelViewerTag' not in text:
    text = text.replace('export const Food3DViewer', 'const ModelViewerTag = " model-viewer\ as unknown as React.ElementType;\n\nexport const Food3DViewer')
 text = text.replace('<model-viewer', '<ModelViewerTag')
 text = text.replace('</model-viewer>', '</ModelViewerTag>')
 path.write_text(text, encoding='utf-8')
 print('Replaced successfully!')