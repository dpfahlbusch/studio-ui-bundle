/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - Pimcore Open Core License (POCL)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 *  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
 */

/* eslint-disable  @typescript-eslint/no-var-requires */
const Encore = require('@symfony/webpack-encore')
const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev')
}

Encore
  // directory where compiled assets will be stored
  .setOutputPath(path.resolve(__dirname, 'dist', 'sdk'))
  .setPublicPath('/dist/')

  /*
    * ENTRY CONFIG
    *
    * Each entry will result in one JavaScript file (e.g. app.js)
    * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
    */
  .addEntry('main', path.resolve(__dirname, 'js', 'src', 'sdk', 'main.ts'))

// enables the Symfony UX Stimulus bridge (used in assets/bootstrap.js)
// .enableStimulusBridge('./assets/controllers.json')

  // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
  // .splitEntryChunks()

  // will require an extra script tag for runtime.js
  // but, you probably want this, unless you're building a single-page app
  .disableSingleRuntimeChunk()

  /*
    * FEATURE CONFIG
    *
    * Enable & configure other features below. For a full
    * list of features, see:
    * https://symfony.com/doc/current/frontend.html#adding-more-features
    */
  .cleanupOutputBeforeBuild()
  .enableBuildNotifications()
  .enableSourceMaps(!Encore.isProduction())
  // enables hashed filenames (e.g. app.abc123.css)
  // .enableVersioning(Encore.isProduction())

  // .configureBabel((config) => {
  //   config.plugins.push('@babel/plugin-transform-class-properties');
  // })

  // enables @babel/preset-env polyfills
  // .configureBabelPresetEnv((config) => {
  //     config.useBuiltIns = 'usage';
  //     config.corejs = 3;
  // })

  // enables Sass/SCSS support
  // .enableSassLoader()

  // uncomment if you use TypeScript
  .enableTypeScriptLoader()

  // uncomment if you use React
  .enableReactPreset()

  .addRule({
    test: /inline\.svg$/i,
    use: [{
      loader: '@svgr/webpack',
      options: {
        icon: true,
        typescript: true
      }
    }]
  })

  // uncomment to get integrity="..." attributes on your script & link tags
  // requires WebpackEncoreBundle 1.4 or higher
  // .enableIntegrityHashes(Encore.isProduction())

  // uncomment if you're having problems with a jQuery plugin
  // .autoProvidejQuery()
  .enableEslintPlugin({
    extensions: ['js', 'jsx', 'ts', 'tsx'],
    fix: true
  })

  .addAliases({
    '@Pimcore': path.resolve(__dirname, 'js', 'src', 'core'),
    '@test-utils': path.resolve(__dirname, 'js', 'test-utils')
  })

  .addPlugin(
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.join(__dirname, 'dist', 'vendor',  'vendor-manifest.json'),
    }),
  )

  .addPlugin(
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.join(__dirname, 'dist', 'core-dll', 'core-manifest.json'),
    }),
  )

  .addPlugin(
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  )

  .addPlugin(new webpack.BannerPlugin({
    banner: `
      /**
       * Pimcore
       *
       * This source file is available under two different licenses:
       * - Pimcore Open Core License (POCL)
       * - Pimcore Commercial License (PCL)
       * Full copyright and license information is available in
       * LICENSE.md which is distributed with this source code.
       *
       *  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
       *  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
       */
    `
  }))

  .configureSplitChunks

if (!Encore.isDevServer() && !Encore.isProduction()) {
  Encore
    .addPlugin(new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false }))
}

let config = Encore.getWebpackConfig()

// Exclude inline SVGs for package "@svgr/webpack" from the default encore rule
config.module.rules.forEach(rule => {
  if (rule.test.toString().includes('|svg|')) {
    rule.exclude = /\.inline\.svg$/
  }
})

config = {
  ...config,

  output: {
    ...config.output,
    library: 'pimcore_studio_ui_sdk',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true
  },
}

module.exports = config