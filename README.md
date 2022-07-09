# About

The Notable Tour library will will take the user on a tour of your application.

Notable Tour will highlight different HTMLElements by surrounding the element with a darkened div and providing a text description/instructions for the user to read.

# Install

`npm i https://github.com/birwin0000/notable-tour`


# Instructions

## The HTML

For each element you would like Notable Tour to highlight, provide a data-tour element with the text you would like displayed:

`<span data-tour="This is text notable tour will display">Highlighted Text Here</span>`

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
- [ ] If HTMLElement is larger than screen, the scrollto element hides the arrow and text
- [ ] If Screen is small, the TextBox gets pushed to the left of the screen


# Backlog
- [ ] Autostart Tour with tracking cookies
- [ ] Font Selection
- [ ] Responsive with two regions (top/bottom) and direct
arrow
- [ ] Provide Example from README
- [ ] Animation
    - [ ] Highlighted area moves from one area to another
    - [ ] Additional characters animated
- [ ] Wiki
- [ ] Issues
- [ ] Actions
- [ ] Projects