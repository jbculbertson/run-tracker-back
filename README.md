# RunTracker
Created by Jeff Culbertson

## Building Process

The nice thing about an API built around a MongoDB is that its flexible - if I
decide that I want to add to my schema, I can easily do so.  Knowing that, I started
this API with a very simple structure and captured the most basic data about a run -
the duration and distance.  Once I was able to verify both of those aspects, I
started thinking about more.

To save a route in the database, I needed to take a Google Marker object, which is
a huge JS object containing dozens of keys, and just capture the data I needed, the
latitude and longitude of each marker.  Once I did that, I was in a much better place.

The last challenge was when recalling this info, what could I do with it.  I needed
to take an array of latitude/longtidues, and reubuild a Google Map with that info.

I tried to think like this during this whole project - instead of getting caught up
in the bigger picture, I always viewed a problem in its most granular sense.  This
allowed me to make slow and steady progress through some difficult issues.

## Links
* [Front End Repo](https://github.com/jbculbertson/map-my-run)
* [Deployed Site](https://jbculbertson.github.io/map-my-run/)
* [Back End Repo](https://github.com/jbculbertson/run-tracker-back)
* [Deployed API](https://glacial-oasis-55159.herokuapp.com)

## Technologies Used
  - Express
  - MongoDB
  - Mongoose

## API End Points

| Verb   | URI Pattern            | Controller#Action      |
|--------|------------------------|------------------------|
| POST   | `/sign-up`             | `users#signup`         |
| POST   | `/sign-in`             | `users#signin`         |
| PATCH  | `/change-password/:id` | `users#changepw`       |
| DELETE | `/sign-out/:id`        | `users#signout`        |
| GET    | `/runs`                | `runs#index`           |
| GET    | `/runs/:id`            | `runs#show`            |
| GET    | `/runs/:id`            | `runs#userruns`        |
| POST   | `/runs`                | `runs#create`          |
| PATCH  | `/runs/:id`            | `runs#update`          |
| DELETE | `/runs/:id`            | `runs#destroy`         |

## Entity Relationship Diagram
  * To start, Runtracker has two entities - Users and Runs.  One User can have many runs.

## Unsolved Issues
  - I'm currently trying to model how to add a resource for Likes, which would
  reference the user who liked, and the run they liked.
