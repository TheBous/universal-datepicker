<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/TheBous">
    <img src="https://imgur.com/OHwdF22" alt="Logo" width="80" height="80">
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
- [Usage](#usage)
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

4. Enter your API in `config.js`

```sh
yarn start
```

### Configurable options

1. **_`DOMElement`_**: DOM element to which the calendar should be attached (es. body, #app)

2. **_`today`_**: Pass today from the parent application, so calendar can avoid to adapt itself to internalization and/or timezones.

3. **_`initialDate`_**: selected date to fit calendar to the right month/year on the splash screen

4. **_`weekdaysLabels`_**: Array of weekdays label in current language

5. **_`monthsLabels`_**: Array of months label in current language

6. **_`defaultDates`_**: checkin,checkout in javascript date format ({checkin: new Date(), checkout: new Date()}).

7. **_`orientation`_**: calendar orientation : vertical with scroll or horizontal with arrows (horizontal|vertical).

8. **_`horizontalPages`_**: number of calendar page per view in horizontal view.

9. **_`verticalPages`_**: number of calendar page per view in vertical view.

### Installation

1. Install NPM packages

```sh
yarn add universal-datepicker
```

2. Add this line when you want to show calendar

```sh
const calendar = new UniversalCalendar({configs here})
```

3. Add this line when you want to show calendar
   Add a DOM element in your own project. Coincides with the DOMElement configuration

4. Add custom css hooking to existing classes

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
