# Below commit message conventions are used for better understanding of the changes made in the codebase:

## 1. build

Description: Changes that affect the build system or external dependencies (e.g., updating npm packages, modifying build scripts).

Example: <br>
build: update webpack to version 5

Updated the webpack configuration to support the latest features and improvements in version 5. This includes changes to the plugin system and new optimization settings.
Use Case: When you upgrade a package in your package.json or modify build-related configuration files.

## 2. chore

Description: Miscellaneous tasks that do not fit into other categories, such as maintenance tasks that do not affect the source code directly.

Example: <br>
chore: update .gitignore to include .env files

Added .env files to .gitignore to prevent environment variables from being tracked in version control.
Use Case: Updating configuration files, adding tasks to the build process, or other non-functional updates.

## 3. ci

Description: Changes to your continuous integration configuration files and scripts (e.g., GitHub Actions, CircleCI, Travis).

Example: <br>
ci: update CircleCI config to use Node 14

Modified the CircleCI configuration file to use Node.js version 14 for running tests and builds.
Use Case: When you need to adjust CI settings, scripts, or tools to improve automation workflows.

## 4. docs

Description: Documentation-only changes (e.g., updating README, adding inline code documentation).

Example: <br>
docs: add API documentation for user endpoints

Added detailed documentation for the user-related API endpoints, including examples and descriptions of each endpoint's parameters and responses.
Use Case: Improving or adding to project documentation, like README files, API docs, or inline code comments.

## 5. feat

Description: A new feature for the user, a new piece of functionality.

Example: <br>
feat: add user profile page

Introduced a new user profile page that displays user information and allows users to update their profile settings.
Use Case: Implementing new functionality or features in the project.

## 6. fix

Description: A bug fix.

Example: <br>
fix: resolve login issue on Firefox

Fixed a bug where users were unable to log in using Firefox due to a compatibility issue with local storage handling.
Use Case: Correcting errors or bugs in the existing codebase.

## 7. perf

Description: A code change that improves performance.

Example: <br>
perf: optimize database queries for user search

Improved the performance of user search functionality by optimizing database queries to reduce response time.
Use Case: Making changes aimed at improving the efficiency or performance of the application.

## 8. refactor

Description: A code change that neither fixes a bug nor adds a feature; often aimed at improving code structure or readability.

Example: <br>
refactor: restructure user service for better modularity

Refactored the user service code to improve modularity and separation of concerns, making it easier to maintain and extend.
Use Case: Restructuring existing code without altering its external behavior, often for readability or maintainability.

## 9. revert

Description: Reverts a previous commit.

Example: <br>
revert: revert "feat: add user profile page"

This reverts commit 1234567890abcdef1234567890abcdef12345678.
Use Case: Undoing a previous commit, typically because it introduced a bug or was deemed unnecessary.

## 10. style

Description: Changes that do not affect the meaning of the code (e.g., white-space, formatting, missing semi-colons, etc.).

Example: <br>
style: format code with Prettier

Applied Prettier to automatically format the codebase according to our style guidelines.
Use Case: Making purely stylistic changes to code formatting without changing any logic or functionality.

## 11. test

Description: Adding missing tests or correcting existing tests.

Example: <br>
`test: add unit tests for user authentication service`

Implemented unit tests for the user authentication service to ensure login and registration functions work as expected.
Use Case: Writing new tests or updating existing tests to improve test coverage and reliability.
