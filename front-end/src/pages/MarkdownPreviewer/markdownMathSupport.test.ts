import { markdown, markdownLanguage } from "@codemirror/lang-markdown"
import { markdownMathSupport } from "./markdownMathSupport"

const LATEX_TAGS = ["InlineMathDollar", "InlineMathBracket", "BlockMathDollar", "BlockMathBracket"]
const LATEX_MARK_TAGS = LATEX_TAGS.map(tag => `${tag}Mark`)


const parseMarkdown = (input: string) => {
    const parser = markdown({base: markdownLanguage, extensions: markdownMathSupport}).language.parser;
    const toReplace: { type: string; from: number; to: number; }[] = []
    const tree = parser.parse(input);

    tree.iterate(
        {
            enter(node) {
                if (!LATEX_MARK_TAGS.includes(node.type.name)) return;
                toReplace.push({ type:`[${node.type.name}]`, from: node.from, to: node.to });
            },
        }
    );

    let displacement = 0

    for (const obj of toReplace) {
        input = input.substring(0, obj.from + displacement)
            .concat(obj.type)
            .concat(input.substring(obj.to + displacement));
        displacement += obj.type.length - (obj.to - obj.from)
    }

    return input;
};

test('Inline Math using $...$', () => {
    const input = 'Here is an inline math expression: $E=mc^2$';
    const expectedOutput = 'Here is an inline math expression: [InlineMathDollarMark]E=mc^2[InlineMathDollarMark]';
    expect(parseMarkdown(input)).toBe(expectedOutput);
});

test('Inline Math using \\\\(...\\\\)', () => {
    const input = 'Here is an inline math expression: \\\\(E=mc^2\\\\)';
    const expectedOutput = 'Here is an inline math expression: [InlineMathBracketMark]E=mc^2[InlineMathBracketMark]';
    expect(parseMarkdown(input)).toBe(expectedOutput);
});

test('Block Math using $$...$$', () => {
    const input = `This is a block-level math expression:
$$
a = b + c
$$`;
    const expectedOutput = `This is a block-level math expression:
[BlockMathDollarMark]
a = b + c
[BlockMathDollarMark]`;
    expect(parseMarkdown(input)).toBe(expectedOutput);
});

test('Block Math using \\\\[...\\\\]', () => {
    const input = `This is a block-level math expression:
\\\\[
x = y + z
\\\\]`;
    const expectedOutput = `This is a block-level math expression:
[BlockMathBracketMark]
x = y + z
[BlockMathBracketMark]`;
    expect(parseMarkdown(input)).toBe(expectedOutput);
});

test('Mixed Delimiters in the Same Document', () => {
    const input = `Inline: $E=mc^2$ and \\\\(a = b + c\\\\)
Block:
$$
a = b + c
$$
and
\\\\[
x = y + z
\\\\]`;
    const expectedOutput = `Inline: [InlineMathDollarMark]E=mc^2[InlineMathDollarMark] and [InlineMathBracketMark]a = b + c[InlineMathBracketMark]
Block:
[BlockMathDollarMark]
a = b + c
[BlockMathDollarMark]
and
[BlockMathBracketMark]
x = y + z
[BlockMathBracketMark]`;
    expect(parseMarkdown(input)).toBe(expectedOutput);
});

test('Nested Math Expressions (Edge Case)', () => {
    const input = 'This should not be parsed as math: $a \\\\(b\\\\) c$';
    const expectedOutput = 'This should not be parsed as math: [InlineMathDollarMark]a [InlineMathBracketMark]b[InlineMathBracketMark] c[InlineMathDollarMark]';
    expect(parseMarkdown(input)).toBe(expectedOutput);
});

test('No Math Expressions', () => {
    const input = "This is a plain text without any math expressions.";
    const expectedOutput = "This is a plain text without any math expressions.";
    expect(parseMarkdown(input)).toBe(expectedOutput);
});

test('Empty Input', () => {
    const input = "";
    const expectedOutput = "";
    expect(parseMarkdown(input)).toBe(expectedOutput);
});

test('Empty Math inline using $$', () => {
    const input = "$$";
    const expectedOutput = "$$";
    expect(parseMarkdown(input)).toBe(expectedOutput);
});

test('Empty Math inline using \\\\(\\\\)', () => {
    const input = "\\\\(\\\\)";
    const expectedOutput = "[InlineMathBracketMark][InlineMathBracketMark]";
    expect(parseMarkdown(input)).toBe(expectedOutput);
});

test('Empty Math inline using \\\\[\\\\]', () => {
    const input = "\\\\[\\\\]";
    const expectedOutput = "[BlockMathBracketMark][BlockMathBracketMark]";
    expect(parseMarkdown(input)).toBe(expectedOutput);
});

test('Empty Math Block using $$$$', () => {
    const input = "$$$$";
    const expectedOutput = "[BlockMathDollarMark][BlockMathDollarMark]";
    expect(parseMarkdown(input)).toBe(expectedOutput);
});

test('Single Dollar Sign (Edge Case)', () => {
    const input = "Here is a single $ sign.";
    const expectedOutput = "Here is a single $ sign.";
    expect(parseMarkdown(input)).toBe(expectedOutput);
});

test('Multiple Math Expressions', () => {
    const input = `$x + y$ and \\\\(a \\cdot b\\\\)`;
    const expectedOutput = "[InlineMathDollarMark]x + y[InlineMathDollarMark] and [InlineMathBracketMark]a \\cdot b[InlineMathBracketMark]";
    expect(parseMarkdown(input)).toBe(expectedOutput);
});