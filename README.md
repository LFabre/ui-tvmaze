# UI - TvMaze

This is a small web app with two pages integrated to the TVMaze API. The first page gives information about the show "Powerpuff Girls" and lists all episodes in a given season. On the right side of the page it is possible to use a dropdown in order to select which season will be displayed. Clicking on an episode redirects the user to the Episode Detail page where more in depth information of a specific episode can be seen.

*All data has been fetched using [TVMaze REST API](https://www.tvmaze.com/forums/4/api).*

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

1. `git clone https://github.com/LFabre/ui-tvmaze.git`
2. `npm install`
3. `npm start`

## Routes

### Home - /

Provides detailed information of the show "Powerpuff Girls" and lists all episodes.

### Ep. Detail - /detail/:epId

Provides detailed information of an episode.

## Author

* **Lucas Pullig Fabre**

## License

This project is licensed under the AGPL-3.0 License - see the [LICENSE.md](LICENSE.md) file for details.
