import rootConfig from '../../prettier.config.mjs';

const config = {
  ...rootConfig,
  plugins: ['prettier-plugin-tailwindcss']
};

export default config; 