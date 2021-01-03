/* eslint-disable max-len */
/* eslint-disable padded-blocks */
/* eslint-disable operator-linebreak */
/* eslint-disable no-trailing-spaces */
/* eslint-disable consistent-return */
// eslint-disable-next-line import/no-cycle
import { updatePlaylist } from '@/handlers/spotify';

export default class SongDots {
  constructor(label, id, valence, arousal, x, y, size, p5) {
    this.label = label;
    this.id = id;
    this.valence = valence;
    this.arousal = arousal;
    this.x = x;
    this.y = y;
    this.size = size;

    this.p5 = p5;
  }

  show() {
    this.p5.push();

    // effects
    this.p5.noStroke();
    this.p5.fill(200, 75);
    this.p5.ellipse(this.x, this.y, this.size + 5);

    this.p5.stroke(0);
    if (this.label === 'accepted') { this.p5.fill(0, 225, 0); } else this.p5.fill(150);
    this.p5.ellipse(this.x, this.y, this.size);

    // effects
    this.p5.fill(200, 75);
    this.p5.ellipse(this.x, this.y, this.size - 5);
    this.p5.pop();
  }

  onHover(isSongLoading) {
    if (isSongLoading) {
      if (this.p5.mouseX > this.x - this.size / 2 && this.p5.mouseX < this.x + this.size / 2) {
        if (this.p5.mouseY > this.y - this.size / 2 && this.p5.mouseY < this.y + this.size / 2) {
          return true;
        }
      } return false;
    }
  }

  updateLabels(starDots, chosenPoints) {
    const bounds = starDots[chosenPoints[0]][chosenPoints[1]].showBoundaries();

    // re-compare
    if (this.x > bounds.x1 && 
      this.x < bounds.x2
  && this.y > bounds.y1 && 
      this.y < bounds.y2) {

      if (this.label === 'unaccepted') {

        // change the label to affect the visualisation
        this.label = 'accepted';

        // push it in the playlist array
        updatePlaylist(this.id, 'add');
      }

    } else {

      // eslint-disable-next-line no-lonely-if
      if (this.label === 'accepted') {

        // change the label to affect the visualisation
        this.label = 'unaccepted';

        updatePlaylist(this.id, 'remove');
      }
    }
  }
}