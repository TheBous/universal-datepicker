<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/TheBous">
    <img src="images/datepicker.svg" alt="Logo" width="120" height="120">
  </a>
  <h3 align="center">Pure 8kb Vanilla Javascript plug and play datepicker</h3>
  <p align="center">
    An awesome vanilla javascript datepicker for only 8kb!
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Configurable options](#configurable-options)
  - [Installation](#installation)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!-- ABOUT THE PROJECT -->

## About The Project

Lightweight datepicker component for your projects. It's fully compatible with any frameworks/libraries (React, Vue, Angular, ecc...).
Light fast and customizable. Partially inspired by airbnb/react-dates.

### Built With

This library does not have any dependencies. It's fully and totally pure vanilla javascript. We only used devDependencies to write modern code, beautify and bundle it:

- [babel](https://babeljs.io/)
- [rollup](https://rollupjs.org/)
- [eslint](https://eslint.org/)
- [prettier](https://prettier.io/)

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

2. Clone the repo

```sh
git clone https://github.com/TheBous/universal-datepicker.git
```

3. Install NPM packages

```sh
yarn
```

4. Start your locally application

```sh
yarn start
```

### Configurable options

1. **_`DOMElement`_**: DOM element to which the calendar should be attached (es. body, #app)

2. **_`today`_**: Pass today from the parent application, so calendar can avoid to adapt itself to internalization and/or timezones. Today could be a js `Date`, a string formatted with `YYYY/MM/DD` or an object `{ year, month, day }`

3. **_`initialDate`_**: selected date to fit calendar to the right month/year on the splash screen

4. **_`weekdaysLabels`_**: Array of weekdays label in current language

5. **_`monthsLabels`_**: Array of months label in current language

6. **_`checkin`_**: checkin in javascript date format (checkin: new Date()).

7. **_`checkout`_**: checkout in javascript date format (checkout: new Date()).

8. **_`orientation`_**: calendar orientation : vertical with scroll or horizontal with arrows (horizontal|vertical).

9. **_`horizontalPages`_**: number of calendar page per view in horizontal view.

10. **_`verticalPages`_**: number of calendar page per view in vertical view.

11. **_`onCheckinChange`_**: (function) callback triggered with new checkin date (dd/mm/yyyy) .

12. **_`onCheckoutChange`_**: (function) callback triggered with new checkout date (dd/mm/yyyy) .

13. **_`maxCheckin`_**: max number of days between checkin and checkout (default = 30)

14. **_`leftArrowClassname`_**: Class to add some icon style to left arrow

15. **_`rightArrowClassname`_**: Class to add some icon style to right arrow

### Installation

### `1: Install NPM packages`

```sh
yarn add universal-datepicker
```

### `2: Add these lines when you want to show calendar`

```sh
const UniversalCalendar = require("universal-datepicker");
const calendar = new UniversalCalendar({configs here})
```

### `3: Add a DOM element in your own project. Coincides with the DOMElement configuration`

```sh
<div id="calendar"></div>
```

### `4: Horizontal arrows to switch months are <i></i>. You need to pass to application a class to these icons with leftArrowClassname and rightArrowClassname`

```sh
{
  ...,
  leftArrowClassname: "my-custom-right-arrow-class",
  rightArrowClassname: "my-custom-right-arrow-class"
}
```

### `5: Add custom css hooking to existing classes`

In order to add some style customization, you need to override these CSS classes (optional):

- **_`calendar__wrapper`_**: calendar generic wrapper
- **_`calendar__wrapper--horizontal`_**: calendar wrapper with horizontal orientation
- **_`calendar__wrapper--vertical`_**: calendar wrapper with horizontal orientation
- **_`calendar__weekday`_**: Each generic weekday on the top of calendar
- **_`calendar__header`_**: Header with month - year values
- **_`calendar__arrow-wrapper`_**: Horizontal calendar arrows wrapper
- **_`calendar__arrow`_** : Arrow to change month in horizontal view
- **_`calendar__arrow--left`_**: Arrow left
- **_`calendar__arrow--right`_**: Arrow right
- **_`calendar__cell`_**: Each generic calendar day
- **_`calendar__cell--past`_**: A past day in calendar
- **_`calendar__cell--checkin`_**: Selected checkin in calendar
- **_`calendar__cell--checkout`_**: Selected checkout in calendar
- **_`calendar__cell--range`_**: Date between checkin and checkout
- **_`calendar__cell--today`_**: Today date

<!-- CONTACT -->

## Contact

TheBous - [@the_bous](https://twitter.com/The_Bous1993) - thebous1993@gmail.com

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=flat-square
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=flat-square
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=flat-square
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=flat-square
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=flat-square
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
