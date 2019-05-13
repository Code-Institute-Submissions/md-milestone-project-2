# Marvel vs DC

PC vs Apple, Bad vs Evil there are multiple of ongoing rivalries in our culture.
The main one in the comic book community is Marvel vs DC. This project focuses on comparing both of them as well as provide a broader look at their combined landscape.

## UX

### Wireframes: link

This website is a one-page dashboard consisting of a sidebar on the left-hand side (to provide controls and filters ) and content area on the right containing various graphs displaying the data.

### Goal

The main focus of the user experience of this project was the simplicity and ease of interaction. It was achieved through sensible color palette, elegant and simple layout and convenience features such as a collapsing sidebar, sticking always visible sidebar controls and back to top button.


#### Who is this website for?

This website is for people interested in comic books that want to look at their long history through the lens of data and numbers.

#### What does it fulfil?

This website displays and allows users to interact with data through various graphs. Data consists of a list of comic book characters with various properties. It also features a generator of a random superhero by using Superhero API

#### What it is that users want to achieve

Users want to look up and compare data. Data is visualized through interactive graphs.

#### User Stories

- As a user, I can filter data by gender so I can see a percentage of woman characters across the dataset
- As a user, I can filter data by alignment so I can see a percentage of bad characters that first appeared in 1959
- As a user, I can filter data by race so I can see an alignment distribution across a race of Gods
- As a user, I can filter data by Universum so I can see a peak of the first appearances in Marvel Universum


## Features
 
### Existing Features

- Superhero randomizer - Allows User to display a random superhero from Superhero API (static/js/superHeroAPI.js)
- Universum Selector - Allows users to pick Universum (Marvel or DC) to filter
displayed data
- Race Selector - Allows users to filter data by all races from the dataset
- Alignment Selector Allows users to filter data display by the alignment of character (good, bad, neutral)
- Reset All button - Allows users to reset all filters and go to the default state of the information displayed
- Back to top button - Allows users to move to the top of the page without the need of scrolling manually
- Collapsing Sidebar - Allows users to review graphs and data 'on fullscreen' it also allows mobile users to save screen space when interacting with the application

### Features Left to Implement
- Character vs Character based on their Power statistics.

## Technologies Used

- [D3.js](https://d3js.org/)
    - The project uses **D3.js** to provide backbone to data visualization.

- [dc.js](https://dc-js.github.io/dc.js/)
    - The project uses **dc.js** to simplify data visualization by leveraging d3.js

- [crossfilter](https://square.github.io/crossfilter/)
    - The project uses **crossfilter** 
- [JQuery](https://jquery.com)
    - The project uses **JQuery** to simplify DOM manipulation and improve users experiance.
- [queue.js](https://jquery.com)

- [Superhero API](https://www.superheroapi.com/)
    - The project uses **Superhero API** for random hero generation


## Testing

1. The website was tested on the following browsers: Chrome, Safari, Firefox, Opera. Please note that the test was performed on the latest version of each browser. Testing has shown only one issue: In Safari where Sidebar collapse button is not sticking even though -webkit-sticky was used. After the research issue is still present and may be resolved in the future.

2. HTML Code was put through [W3 Validator](https://validator.w3.org) which reported no issues or warnings,

3. All JavaScript code was put through [semantic validator](http://esprima.org) with no issues found.

4. The website was tested on mobile devices (iPhone X and iPhone XR) and was reported working as expected. Please note that this project is NOT MOBILE Responsive but all care was put into making it functional on smaller screen sizes. For graphs that are too big to fit given display CSS property overflow: auto; was used for horizontal scrolling option.

## Deployment

The website was coded in Visual Studio Code. Version Control and backup were managed using git. The project was committed and pushed to remote GitHub repository and made accessible using Git Hub Pages.

## Credits

### Content

Core data set source: was edited and optimized by me.

### Media

All pictures visible are sourced from Superhero API and are under copyright from their respectful publishers  

### Acknowledgements

