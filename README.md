# Card-Matching Memory Game

A single-player web game that asks a user to match pairs of cards by color on a
randomly generated board. When the game is over, the user is given a star rating
based on the number of turns taken, and is allowed to start a new game. It was
built to satisfy the final project requirements for Udacity's [Intro to Programming Nanodegree](https://www.udacity.com/course/intro-to-programming--ud000).

## Rules

A move consists of revealing a pair of cards (cards are revealed by clicking on
them). Matching pairs will remain revealed until the end of the game.
Non-matching pairs will get covered up until they are clicked on again. The game
ends when all cards are revealed.

## Rating System

Players start with a three-star rating. They lose one star after ten moves, and
another after fourteen moves.
