# React + Vite

How would your tables and apis change for the following scenarios. What tables and api
endpoints would you add? Which tables and api endpoints would need to be updated?
# 1. If a user can create and edit stages for a particular board. For example instead of
# Open > In Progress > Done if they want the stages of their task board to be Read >
# Working > Reviewing > Completed

I'll create a new table named "stages" where each instance will store the stages for each board.
for apis i would need new API endpoints to manage stages, such as:
POST /api/boards/:boardId/stages to create a new stage for a board.
PUT /api/boards/:boardId/stages/:stageId to edit the name or order of a stage.
DELETE /api/boards/:boardId/stages/:stageId to delete a stage from a board.

# 2. If users can comment on tasks
For adding comments on tasks we'll need a new table called "comments" which we can associate with others using a foreign key

# 3. How will you do error handling?

we can add error messages in the response body to provide information about what went wrong.
we can use try and catch method.
we can use console.logs at appropriate places to get to know about any possible errors.
