import webpack from 'webpack';
import { buildResolvers } from './buildResolvers';

import { BuildOptions } from './types/config';
import { buildDevServer } from './buildDevServer';
import { buildPlugins } from './bulidPlugins';
import { buildLoaders } from './builLoaders';

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    const { paths, mode, isDev } = options;
    return {
        mode,
        entry: paths.entry,
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true,
            publicPath: '/',
        },

        plugins: buildPlugins(options),

        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? buildDevServer(options) : undefined,
    };
}
