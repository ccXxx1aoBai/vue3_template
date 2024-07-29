import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { obfuscator } from 'rollup-obfuscator';
import { compression } from 'vite-plugin-compression2';
import path from 'path';

export default defineConfig((mode: ConfigEnv) => {
	const env = loadEnv(mode.mode, process.cwd());
	return {
		plugins: [
			vue(),
			{
				...obfuscator({
					global: false,
					options: {
						compact: true,
						controlFlowFlattening: true,
						controlFlowFlatteningThreshold: 0.75,
						numbersToExpressions: true,
						simplify: true,
						stringArrayShuffle: true,
						splitStrings: false,
						splitStringsChunkLength: 10,
						rotateUnicodeArray: true,
						deadCodeInjection: true,
						deadCodeInjectionThreshold: 0.4,
						debugProtection: false,
						debugProtectionInterval: 2000,
						disableConsoleOutput: false,
						domainLock: [],
						identifierNamesGenerator: 'hexadecimal',
						identifiersPrefix: '',
						inputFileName: '',
						log: true,
						renameGlobals: true,
						reservedNames: [],
						reservedStrings: [],
						seed: 0,
						selfDefending: false,
						sourceMap: false,
						sourceMapBaseUrl: '',
						sourceMapFileName: '',
						sourceMapMode: 'separate',
						stringArray: true,
						stringArrayEncoding: ['base64'],
						stringArrayThreshold: 0.75,
						target: 'browser',
						transformObjectKeys: true,
						unicodeEscapeSequence: true,
						domainLockRedirectUrl: 'about:blank',
						forceTransformStrings: [],
						identifierNamesCache: null,
						identifiersDictionary: [],
						ignoreImports: true,
						optionsPreset: 'default',
						renameProperties: false,
						renamePropertiesMode: 'safe',
						sourceMapSourcesMode: 'sources-content',
						stringArrayCallsTransform: true,
						stringArrayCallsTransformThreshold: 0.5,
						stringArrayIndexesType: ['hexadecimal-number'],
						stringArrayIndexShift: true,
						stringArrayRotate: true,
						stringArrayWrappersCount: 1,
						stringArrayWrappersChainedCalls: true,
						stringArrayWrappersParametersMaxCount: 2,
						stringArrayWrappersType: 'variable',
					},
				}),
				apply: 'build',
			},
			{
				...compression({
					include: /.(js|css|html|json|mjs|png|jpg|jpeg|svg)$/i,
					deleteOriginalAssets: false,
					threshold: 102400,
					skipIfLargerOrEqual: true,
					algorithm: 'gzip',
				}),
				apply: 'build',
			},
		],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
				'~@': path.resolve(__dirname, 'src'),
			},
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@use "@/assets/style/style.scss" as *;`,
				},
			},
		},
		base: './',
		build: {
			rollupOptions: {
				input: './index.html',
			},
			assetsDir: './static',
			sourcemap: false,
			minify: 'terser',
			terserOptions: {
				compress: {
					drop_console: true,
					drop_debugger: true,
				},
			},
		},
		server: {
			proxy: {
				[env.VITE_API_PREFIX]: {
					target: env.VITE_BASE_URL,
					changeOrigin: true,
					rewrite: path => path.replace(env.VITE_API_PREFIX, ''),
				},
				[env.VITE_PREFIX_STATIC]: {
					target: env.VITE_STATIC_URL,
					changeOrigin: true,
					rewrite: path => path.replace(env.VITE_PREFIX_STATIC, ''),
				},
			},
		},
	};
});
