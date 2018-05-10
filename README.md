# Feather Pager - A jQuery plugin
This is a light-weight jQuery-dependent paginator, detached entirely from the data, and solely focused on paginating. Too many of the paginators out there want to see, or even manipulate, the data. That's not what paging is about, and this simplifies that to the bare necessities. All you need to know is what page you are on and what page you want to go to.

Go to **[jsfiddle](https://jsfiddle.net/seraphx2/b7kv8g9a/)** to see a working example.

## Package Availability
### Yarn
`$ yarn add feather-pager`
### NPM
`$ npm i feather-pager`
### CDN
`https://cdn.jsdelivr.net/npm/feather-pager/src/jquery.feather-pager.min.js`

## Basic Implementation
Given:
```html
<ul id="pager"></ul>
```

### Attaching the pager
These are the only settings that a new pager can be instantiated with. You can override the text of the Previous and Next buttons and set the initial amount of pages.
```js
$("#pager").pager({
    pages: 5, //required
    previous: "<< Previous", //optional
	next: "Next >>" //optional
});
```

### Updating the Page count
In some cases you may want to update the page count and can do so with this method:
```js
$("#pager").pager("setPages", 15);
```

### Knowing which Page the User selected
All you need to know from the pager is which page the user wants to see. How many records per page, or any other data relevant to retrieve the data from the server is not needed to be known by the pager. This event is raised everytime a page is navigated to in the pager and it simply returns the page number that was selected.
```js
$("#pager").on("page.change", function (e, page) {
	//Run ajax/fetch call to retrieve data.
});
```

## Basic SCSS Structure for Styling
Here is a simple bit of SCSS you can use to get started styling the page "buttons". The page "buttons" (including ellipsis, but not 'previous' or 'next') are also assigned a class called `page`. This was implemented to be able to manipulate them directly (e.g. with a media query if the screen size gets too small).
```css
.pager li {
    display: inline;
    margin-right: 5px;
    color: black;
    cursor: pointer;
    border: 1px solid black;
    border-radius: 3px;
    padding: 2px 10px;

    &.active {
        color: orange;
    }

    &.disabled {
        cursor: not-allowed;
    }

    &.ellipses {
        cursor: default;
        border: none;
    }
}

@media (max-width: 480px) {
    .pager li.page {
        display: none;
    }
}
```