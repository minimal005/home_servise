import webp from "gulp-webp";
import imagemin, { svgo } from "gulp-imagemin";

export const images = () => {
  return app.gulp
    .src(app.path.src.images)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "IMAGES",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(app.plugins.newer(app.path.build.images))
    .pipe(app.plugins.if(app.isWebP, webp()))
    .pipe(app.plugins.if(app.isWebP, app.gulp.dest(app.path.build.images)))
    .pipe(app.plugins.if(app.isWebP, app.gulp.src(app.path.src.images)))
    .pipe(app.plugins.if(app.isWebP, app.plugins.newer(app.path.build.images)))
    .pipe(
      app.plugins.if(
        app.isImgOpt,
        imagemin([
          imagemin.mozjpeg({ quality: 75, progressive: true }),
          imagemin.optipng({ optimizationLevel: 5 }),
          svgo({
            plugins: [
              { removeViewBox: false },
              // інші плагіни за потреби
            ],
          }),
        ])
      )
    )
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.svg))
    .pipe(
      app.plugins.if(
        app.isImgOpt,
        imagemin([
          svgo({
            plugins: [
              { removeViewBox: false },
              // інші плагіни за потреби
            ],
          }),
        ])
      )
    )
    .pipe(app.gulp.dest(app.path.build.images));
};
