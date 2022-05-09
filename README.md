# Git Search Project

## Objective
Build a repository search application using the Github repository search API which then displays the results of the query.
## Technologies Used
* React
* JavaScript
* HTML
* CSS
* Reaviz

## To Run the Application
1. Clone the Github repository
    (For details about cloning a repostitory, visit https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository )
2. From within the project folder, run the command 'npm install' at the command line to install the required packages.
3. Once the packages are done installing, from the command line within the project folder, run the command 'npm start'.
4. The application should start at http://localhost:3000/

## Caveats
1. The Github Search Repositories API returns a maximum of 100 repositories per page, with a default of 30. (https://docs.github.com/en/rest/search#search-repositories ). I have kept the default setting. Therefore the application currently returns 30 repositories, with no option to return more.  Future implementations would allow for pagination of all repositories discovered.  e.g. a general search term of 'stars' with no language filter returns 20,877 repositories, but currently only the first 30 are returned and displayed. Those wishing to learn more can find info here: https://docs.github.com/en/rest/overview/resources-in-the-rest-api#pagination and here: https://docs.github.com/en/rest/guides/traversing-with-pagination
2. The Github Search Repositories API limits the number of searches performed to 10 requests per minute for unathenticated requests. In the current iteration of the application, all requests are unathenticated. Users are advised to not submit requests too quickly as a 403 error is returned when more than 10 requests mer minute are submitted. 
3. The application is reponsive from larger screens down to screens sizes of 300px. Screens smaller than 300px may experience horizontal scrolling, but not overflow of containers.

## Using the Application
When navigating to the home page, users will be greeted with the following page:
!{[Initial Homepage] (https://github.com/dreamlabo/git-search-project/blob/main/src/screenshots/initial_homepage.png)
 
