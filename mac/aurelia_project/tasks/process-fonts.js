import gulp from 'gulp';
import changedInPlace from 'gulp-changed-in-place';
import project from '../aurelia.json';
import {build} from 'aurelia-cli';

export default function processFonts() {
  return gulp.src(project.fontsProcessor.source)
    .pipe(changedInPlace({firstPass:true}))
    .pipe(gulp.dest(project.fontsProcessor.dest));
}