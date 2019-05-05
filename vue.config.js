module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/apartmanago/' : '/',
    css: {
        loaderOptions: {
            sass: {
                data: `
                  @import "@/styles/main.scss";
                `
            }
        }
    }
};
