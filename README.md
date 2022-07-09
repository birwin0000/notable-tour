# Install

`npm i https://github.com/birwin0000/notable-tour`


# Instructions

## Config
Pass an object that overrides any of these values to the NotableTour constructor to customize the look of the tour:

```
    let cofig = {
        backgroundColor: 'black',
        color: '#ffffff',
        highestZ: 999,
        opacity: .8,
        className: 'notable-div-dyn',
        buttons: {
            next: {
                classes: ["btn", "btn-primary"]
            },
            previous: {
                classes: ["btn", "btn-primary"]
            },
            end: {
                classes: ["btn", "btn-primary"]
            },
        }
    }

    let tour = new NotableTour(config);
```

## React/Angular
```
import { NotableTour } from 'notable-tour';

class SomeComponent {
  public doTour() {
    let tour = new NotableTour();
    tour.start();
  }
}

<button (click)="doTour()">Start Tour</button>
```

## Web Page Module
```
        <script type="module">
            import { NotableTour } from './node_modules/notable-tour/index.js';
            window.startTour = () => {
                let tour = new NotableTour()
                tour.start();
            };
        </script>

        <button onclick="startTour()">Tour!</button>
```

# Bugs
    - If HTMLElement is larger than screen, the scrollto element hides the arrow and text
    - If Screen is small, the TextBox gets pushed to the left of the screen


# Backlog
- [ ] Font Selection
- [ ] Text Box Moves offscreen
- [ ] Responsive with two regions (top/bottom) and direct arrow
- [ ] Animation
    - [ ] Highlighted area moves from one area to another
    - [ ] Additional characters animated