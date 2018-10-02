# Assignment 2 3813ICT
### Developed by Taylor Hannan

## Git Layout
The approach taken for version control was done by using frequent commits of an *error free* state of the project. This is done by frequent testing of all added features & functions. Thus, there was no use for branches aside from the master branch. The layout of the git is fairly simple, a README and the AssignmentTwo folder. Through that there is the Angular files, as well as the server folder located under *./src/server*, which is where the MongoDB is run, the node.js socket files, and the node.js server/API files are hosted.

## Main Data Structures
### Users
Users are represented by using MongoDB items, and are represented their string value. The item is grabbed from the database by matching their string to the name under the 'name' parameter of the MongoDB "users" collection. All user data is held in the "users" collection, which is created upon startup of the server. There is originally only one user in this collection, called 'super'. Each user has four attributes in it's entry in the database:
+ name - the username of the user
+ email - the email of the user
+ role - the role of the user
+ image - the image of the user

Each user **must** have one of each of these parameters, or it is not a valid user.

### Groups
Groups are represented by using MongoDB items, and are represented their string value. The item is grabbed from the database by matching their string to the name under the 'name' parameter of the MongoDB "groups" collection. All group data is held in the "groups" collection, which is created upon startup of the server. There is originally only one group in this collection, called 'Group1'. Each group has one attribute in it's entry in the database:
+ name - the name of the group

Each group **must** have this parameter, or it is not a valid group. It was originally planned that the group was intended to have another parameter called "users", which would be an object containing all users inside of a group, but due to development constraints this was never implemented.

### Data Diagram
The data structure is as follows:

![alt text](https://i.imgur.com/yfqrVQL.png "Data Structure Image")

## Angular Architecture
### Components
There are five components, as follows:

#### Home Component
This component is responsible for the login of Users. If a user is already logged in, they cannot access this page.

#### Nav Component
The Nav component is a static component that controls the routes to the Home, Chat, and Admin Components, as well as an external link to the Github repository for this project. The Nav is always at the top of the page, regardless of what component you route to.

#### Chat Component
This component hosts the chat functionalities of the project. A logged in user is able to send and receive messages on the public channel of this component. It is intended to show channels of each group the User is a part of, but unfortunately this functionality was not working as per the deadline of this project. Only logged in Users can access this component.

#### Admin Component
This component hosts the Admin Dashboard. It is responsible for controlling the creation & deletion of Users & Groups. If a logged in User's role is *user*, they are unable to access this component.

#### Profile Component
This component is used so a user can modify their profile. It only currently allows them to change their profile picture. A user can upload a new profile picture and submit it to change their picture. This picture then shows up in chat messages sent.

### Services
#### Socket Service
This service is responsible for pulling & pushing messages from the node.js server. It works by having two functions which are called within the Chat component, these functions are getMessages & sendMessage.

#### ImgUpload Services
This service is responsible for handling the post of the FormData which contains image data. This is called when a user uploads a new profile image, and sends it to the backend node.js server.

### Models
There was no definitive models used in this project, as it was more efficient to instead have the models be incorporated into the *export class* portion of the Component. The models built into the components are as follows:
* Users Object Model
* Group Object Model
* username/email/role for User Login
* username/email/role for User Creation
* groupname for Group Creation
* messages array for Chat
* connection/message variables for Chat
* DeletedUser for User Deletion
* DeletedGroup for Group Deletion

## REST API
### User Routes
#### /api/auth
The 'auth' route is used to authorise users upon sign-in. It does so by taking the parameters *username* & *email* from the login form on the homepage. It then checks for an existing match of username & email in the MongoDB; if there is a match, it allows access - returning true. The returned data is the username, email, and role from the MongoDB, as well as success equaling true. If there is no match found, the response to Angular is the success criteria being false.

#### /api/reg
This route is used to manage user registration. It does so by taking the following parameters entered on the user registration form on the AdminComponent: *username*,  *email*, and *role*. When these parameters are received, it checks to see if there is already a match for username or a match for email (no two users can share the same username or email). If no match is found, it then writes the new user with the parameters it was sent from Angular to MongoDB and returns the parameters entered with the success parameter equaling *true*. All created users have the same default image until changed.

#### /api/del
To delete a user, this route must be used. It takes the parameter of the user's name, before reading for the match of the user name in the MongoDB database. It then deletes the associated *email* & *role*, as well as the username specified. If no match for username is found, it returns *success* as *false*. If the deletion was successful, MongoDB removes the document from it's database and returns the *username* & *success* equaling true.


#### /api/users
This route is only used to get data from the User MongoDB collection to display the list of current users in an options loop of the admin component. When data is sent to the route, it returns the variable *userData* which is the contents of the *user* collection from MongoDB.
This route requires no special parameters, only a request to be sent to it for it to return the user data.

#### /api/user
This route is only used to get a single user's data from the User MongoDB Collection to display the list of current users in an options loop of the admin component. When data is sent to the route, it returns all of the User's  data
This route only requires that is sent a username. It is used for getting the *imagepath* of a user.

### Group Routes
#### /api/groupreg
This route is used to manage group registration. It does so by taking the parameter *groupname* entered on the registration form on the AdminComponent. When this parameter is received, it checks to see if there is already a match for groupname (no two groups can share the same groupname). If no match is found, it then writes the new group with the name it was sent from Angular to the *groups* collection of MongoDB and returns the parameter entered with the success parameter equaling *true*.

#### /api/groupdel
To delete a group, this route must be used. It takes the parameter of the group's name, before reading for the match of the group name in the MongoDB database. It then deletes the associated document. If no match for username is found, it returns *success* as *false*. If the deletion was successful, MongoDB removes the document from it's database and returns the *groupname* & *success* equaling true.


#### /api/groups
This provided route is only used to get data from the Group MongoDB collection to display the list of current groups in an options loop of the admin component. When data is sent to the route, it returns the variable *groupData* which is the contents of the *groups* collection of MongoDB.
This route requires no special parameters, only a request to be sent to it for it to return the user data.

### Image routes
#### /api/upload
This route is used for image uploads. It takes the form data sent from the *imgupload* Service, and stores the image in the local database (under ./images). The images can then be accessed via *localhost:3000/images/*.

#### /api/userimage
This route is used in conjunction with */api/upload*, as both requests to these routes are sent at the same time. This route is used to update the logged in User's profile image by sending the new image link (found in */api/upload*) and updates the User's MongoDB document by appending the new image location.

## Testing AssignmentTwo
### How To Test
To test Assignment 2, you must first cd into the following directory:
```
.\AssignmentTwo\AssignmentTwo\src\server>
```
Ensure both the *Angular Server* and *node.js* Server are running.
After this, you must then run the command:
```
npm test
```

The tests will then proceed to run and return their intended responses.
