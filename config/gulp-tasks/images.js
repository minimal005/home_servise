import webp from "gulp-webp";
import imagemin from "gulp-imagemin";

export const images = () => {
  return (
    app.gulp
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

      // Конвертація у WebP (якщо увімкнено)
      .pipe(app.plugins.if(app.isWebP, webp()))
      .pipe(app.plugins.if(app.isWebP, app.gulp.dest(app.path.build.images)))

      // Оптимізація зображень (JPEG, PNG, GIF)
      .pipe(
        app.plugins.if(
          app.isImgOpt,
          imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3, // 0 to 7
          })
        )
      )
      .pipe(app.gulp.dest(app.path.build.images))

      // Обробка SVG (додаємо оптимізацію)
      .pipe(app.gulp.src(app.path.src.svg))
      .pipe(
        app.plugins.if(
          app.isImgOpt,
          imagemin([
            imagemin.svgo({
              plugins: [{ removeViewBox: false }],
            }),
          ])
        )
      )
      .pipe(app.gulp.dest(app.path.build.images))
  );
};
