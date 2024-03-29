# About

The Notable Tour library will take the user on a tour of your application.

Notable Tour will highlight different HTMLElements by surrounding the element with a darkened div and providing a text description/instructions for the user to read.

# Install

`npm i notable-tour`

# Example
Coming Soon

# Instructions

## The HTML

For each element you would like Notable Tour to highlight, provide a data-tour element with the text you would like displayed:

`<span data-tour="This is text notable tour will display">Highlighted Text Here</span>`

## Config
Pass an object that overrides any of these values to customize the look of the tour:

```
        let config = {
            backgroundColor: 'black',
            color: '#ffffff',
            opacity: .8,
            className: 'notable-tour',
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
            },
            theme : 'light'
        };


    tour.start(config);
```

Themes include:
- light
- dark
- elegant
- fantasy
- robot

## Import (React?/Angular?)
```
import tour from 'notable-tour';

class SomeComponent {
  public doTour() {
    tour();
  }
}

<button (click)="doTour()">Start Tour</button>
```
