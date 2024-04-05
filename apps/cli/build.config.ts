import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [{
    input: 'src/index.ts',
    name: 'weibo-archiver',
  }],
  declaration: false,
  clean: true,
  failOnWarn: false,
  rollup: {
    emitCJS: false,
    esbuild: {
      target: 'esnext',
    },
  },
})
