import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import cjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import nodeEval from 'node-eval';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export function getModuleExports(moduleId) {
    const id = require.resolve(moduleId);
    const moduleOut = nodeEval(require('fs').readFileSync(id).toString(), id);
    const excludeExports = /^(default|__)/;
    return moduleOut && typeof moduleOut === 'object' ? Object.keys(moduleOut)
        .filter(name => !excludeExports.test(name)) : [];
}

const getNamedExports = (...modules) => modules
    .map(id => ({[id]: getModuleExports(id)}))
    .reduce(Object.assign, {});
export default {
    plugins: [
        resolve({extensions}),
        replace({'process.env.NODE_ENV': JSON.stringify('production')}),
        cjs({
            extensions: ['.js'],
            namedExports: getNamedExports('react', 'react-dom')
        }),
        babel({
            extensions,
            plugins: [
                ["@babel/proposal-class-properties"],
                ["@babel/proposal-object-rest-spread"],
            ],
            presets: [
                ["@babel/react"],
                ["@babel/typescript"]
            ]
        })
    ],
    input: 'index.tsx',
    output: {
        file: 'index.js',
        format: 'iife',
        globals: {},
    }
}
