# social-media-front-end

## Description

A frontend social media platform that allows users to login as a DALI member and create posts, like posts, view all DALI members, and more.

## Deployed Site

Click [here](https://quirky-clarke-dcdca6.netlify.app/) for deployed frontend social media website.

## Features

1. Each user can like each post once and they can unlike it by clicking on the thumbs up button again.

1. You can view all profiles by clickign at the icon on the navbar

1. At all profiles, you can click on each user and that will show a modal of all their details

1. Each post created contains the owner of the post's profile and you can click on the profile and that will link you to their personal profile page.

1. Each person's personal profile page shows their profile and a list of posts they have created in the past and you can like the posts there too.

1. You can view your own profile by clicking your own image in the navbar

1. You can login and logout to another account (incomplete because there is no backend and this was the best I could do if I was just working on frontend)


## What could have been better

1. I did not invest too much time in styling as I wanted to focus on building as many features as possible.

1. Every user can login to any account because there isn't an authentication system setup.

## Further work (If only I had more time!)

1. Commenting feature where anyone can comment on each posts wouldn't be too difficult to implement based on the way I had set it up. Since I already has a allPosts list stored locally (didn't do backend) I could add a new key to each post created called "comments" which would contain a list which contains a map. Each time a new comment is created, it would be pushed into the list so that the page can render the comments sorted in order of creation. Within the list, it would contain maps such that whenever a new comment is made, a map looking like { userId: message } would be pushed into the list so that the page can render the comments with the commenter's details along side with the message.

1. Setting up a backend so that it can store all the posts that have been created.

1. Show posts only from friends. To do so, all I have to do is add a key to each user that would contain a list of all their friend's user ids. Then, in the homepage, since I am already checking the currentUser, I can loop through allPosts and for each post, if post.ownerId is in the currentUser.friends list, then display the post.