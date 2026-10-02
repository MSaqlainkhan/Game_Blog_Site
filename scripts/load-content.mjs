/**
 * Loads the TypeScript content store from a plain-JS validator script.
 *
 * Node in this environment has no native TypeScript support, and adding a
 * runtime transpiler dependency purely for validation would be a poor trade.
 * The `typescript` package is already a devDependency, so this uses its
 * `transpileModule` to compile data/*.ts to CommonJS in a temp directory and
 * require the result.
 *
 * Nothing in the content store executes side effects, so this is equivalent to
 * importing it directly.
 */
import { createRequire } from 'node:module';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname, relative } from 'node:path';
import { createRequire as createNodeRequire } from 'node:module';

const require = createRequire(import.meta.url);

/** @type {{ transpileModule: Function, ModuleKind: any, ScriptTarget: any }} */
const ts = require('typescript');

const ROOT = join(import.meta.dirname, '..');

const SOURCES = [
  'types/index.ts',
  'data/authors.ts',
  'data/categories.ts',
  'data/games.ts',
  'data/reviews.ts',
  'data/news.ts',
  'data/guides.ts',
];

/**
 * Rewrites the `@/` path alias to a relative path, since the compiled modules
 * live outside the project and cannot resolve tsconfig paths.
 */
function rewriteAliases(source, outFile) {
  return source.replace(/from\s+['"]@\/([^'"]+)['"]/g, (_match, target) => {
    const resolved = `${target}.ts`;
    let path = relative(dirname(outFile), join(ROOT, resolved)).replace(/\\/g, '/');
    if (!path.startsWith('.')) path = `./${path}`;
    return `from '${path}'`;
  });
}

export function loadContent() {
  const outDir = mkdtempSync(join(tmpdir(), 'gp-content-'));

  try {
    const emitted = new Map();

    for (const source of SOURCES) {
      const outFile = join(outDir, `${source.replace(/\//g, '__')}.cjs`);
      const original = readFileSync(join(ROOT, source), 'utf8');

      const { outputText } = ts.transpileModule(rewriteAliases(original, outFile), {
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          target: ts.ScriptTarget.ES2020,
          esModuleInterop: true,
        },
        fileName: source,
      });

      writeFileSync(outFile, outputText);
      emitted.set(source, outFile);
    }

    const load = (source) => createNodeRequire(emitted.get(source))(emitted.get(source));

    return {
      authors: load('data/authors.ts'),
      games: load('data/games.ts'),
      reviews: load('data/reviews.ts'),
      news: load('data/news.ts'),
      guides: load('data/guides.ts'),
    };
  } finally {
    process.on('exit', () => rmSync(outDir, { recursive: true, force: true }));
  }
}
