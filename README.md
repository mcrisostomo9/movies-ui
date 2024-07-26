# MC Movies app

## My approach to the excercise

I wanted to use the latest React paradigms with React Server Components and NextJS App Router. I kept the styling very simple with just TailwindCSS, even though I did want to create something more slick.

To fetch the movies, I leveraged RSCs to make fetch requests to keep it very simple. When I needed to either filter by genre, or paginate the results, I relied on query params to keep my state and make my queries based off of that. I have been enjoying that pattern lately since I can create shareable links based off of client state.

An interesting part of the project for me was learning about NextJS's parallel routes in combination with intercepting routes. I integrated that pattern by creating a sort of Instagram style modal pop up on click of a movie, but giving that modal a unique URL. This was based off the NextJS docs example but it gave me a lot of future ideas that I could use in the future.

I would say I'm most pleased with the fact that in terms of the actual requirements, it only took me an hour or so of actual work. Although the implementation was simple, I am just thinking of how far I've come when I started developing 8~ years ago :)

Given more time, I wanted to add some sort of autocomplete feature to the search bar. I also wanted to add some animations with framer motion. Also would have integrated the Youtube API to try and get the movie trailers to be embedded.
