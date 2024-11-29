import Prism from 'prismjs'
import 'prismjs/components/prism-markdown'
import { useCallback, useMemo } from 'react'
import { NodeEntry, Text, createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { Editable, RenderLeafProps, Slate, withReact } from 'slate-react'
import { css } from '@emotion/css'

const initialValue = [
  {
    type: 'paragraph',
    children: [
      {
        text: `# Simple Editor

A ideia do projeto é fazer um editor de textos web, com **GO** como linguagem do back-end, e para o front-end pretendo usar React e TypeScript

O projeto tem as seguintes pretenções:
1. Ser esteticamente agradável
2. Ser "independente" de framawork para front-end
3. Poder exportar PDFs padronizados _(padrão a definir)_
4. Ser fácil de testar e fazer deployment (não requer 10 mil etapas pra implementar mudanças)
5. Ter testes automatizados **(GitHub Actions)**

A escolha da linguagem **GO** para o back-end foi feita pelo fato de que ela permite a compilação de arquivos binário que independe de sistema operacional ou de programas pré instalados na máquina para rodar, e todo o serviço pode ser imbutido num só arquivo binário. Além disso a linguagem permite fácil escalabilidade vertical _(mais cpu == mais performance)_.

Para instalar o projeto recomendo que tenha **nix** instalado na máquina e que rode os seguintes comandos da raiz do projeto. Caso use __Windows__ recomendo que use \`\`\`wsl\`\`\` para rodar tudo em ambiente linux.

\`\`\`bash
nix-shell
make build
\`\`\``,
      },
    ]
  }
]

type TToken = string | Prism.Token | {content: (string| Prism.Token |TToken)[]}

export default function MarkdownPreview() {
    const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, [])
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])
    const decorate: (entry: NodeEntry) => Range[] | any = useCallback(([node, path]) => {
        const ranges: (Range | any)[] = []

        if (!Text.isText(node)) {
            return ranges
        }

        const getLength = (token: TToken): number => {
            if (typeof token === 'string') {
                return token.length
            } else if (typeof token.content === 'string') {
                return token.content.length
            } else if (Array.isArray(token.content)) {
                return token.content.reduce((l, t) => l + getLength(t), 0)
            } return 0
        }

        const tokens = Prism.tokenize(node.text, Prism.languages.markdown)
        let start = 0
        for (const token of tokens) {
            const length = getLength(token)
            const end = start + length

            if (typeof token !== 'string') {
                ranges.push({
                    [token.type]: true,
                    anchor: {path, offset: start},
                    focus: {path, offset: end},
                })
            }

            start = end
        }

        return ranges
    }, [])

    return (
        <Slate editor={editor} initialValue={initialValue}>
            <Editable
                decorate={decorate}
                renderLeaf={renderLeaf}
                placeholder='Vamos escrever...'
            />
        </Slate>
    )
}


const Leaf: (props: RenderLeafProps | any) => React.JSX.Element = ({attributes, children, leaf}) => {
  let titleSize = 28
  if (leaf.title) {
    titleSize = 
      (leaf.text.startsWith("#######"))? 16:
      (leaf.text.startsWith("######"))? 18:
      (leaf.text.startsWith("#####"))? 20:
      (leaf.text.startsWith("####"))? 22:
      (leaf.text.startsWith("###"))? 24:
      (leaf.text.startsWith("##"))? 26: 28
  }
  return (
    <span
      {...attributes}
      className={css`
        font-weight: ${leaf.bold && 'bold'};
        font-style: ${leaf.italic && 'italic'};
        text-decoration: ${leaf.underlined && 'underline'};
        ${leaf.title &&
        css`
          display: inline-block;
          font-weight: bold;
          font-size: ${titleSize}px;
          margin: 20px 0 10px 0;
        `}
        ${leaf.list &&
        css`
          padding-left: 10px;
          font-size: 20px;
          line-height: 10px;
        `}
        ${leaf.hr &&
        css`
          display: block;
          text-align: center;
          border-bottom: 2px solid #ddd;
        `}
        ${leaf.blockquote &&
        css`
          display: inline-block;
          border-left: 2px solid #ddd;
          padding-left: 10px;
          color: #aaa;
          font-style: italic;
        `}
        ${leaf.code &&
        css`
          font-family: monospace;
          background-color: #eee;
          padding: 3px;
        `}
        ${leaf.url &&
        css`
          color: #a0f;
        `}
        ${leaf.strike &&
        css`
          text-decoration: line-through;
        `}
      `}
    >
      {children}
    </span>
  )
}