# Contributing Guide

Thank you for investing your time in contributing to our project!

Please read our [Code of Conduct](./CODE_OF_CONDUCT.md) to keep our community inclusive and respectable.

This guide will provide an overview of the contribution workflow, including opening an issue, creating a pull request (PR), and the review and merge process.

## New Contributor Guide

To familiarize yourself with the project, please read the [README](README.md). Here are some resources to help you get started with open-source contributions:

- [Finding ways to contribute to open-source on GitHub](https://docs.github.com/en/get-started/exploring-projects-on-github/finding-ways-to-contribute-to-open-source-on-github)
- [Setting up Git](https://docs.github.com/en/get-started/quickstart/set-up-git)
- [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- [Collaborating with pull requests](https://docs.github.com/en/github/collaborating-with-pull-requests)
- [pnpm CLI](https://pnpm.io/pnpm-cli)

## Getting Started

### Issues

#### Creating a New Issue

If you come across an issue or have a feature request for Nexus, please [search if a related issue has already been reported](https://docs.github.com/en/github/searching-for-information-on-github/searching-on-github/searching-issues-and-pull-requests#search-by-the-title-body-or-comments). If no relevant issue exists, you can open a new issue using the appropriate [issue form](https://github.com/Polyfrost/Nexus/issues/new/choose).

#### Solving an Issue

To find an issue that interests you, you can browse through our [existing issues](https://github.com/Polyfrost/Nexus/issues) and use the available `labels` to narrow down your search (See [Labels](https://github.com/Polyfrost/Nexus/labels) for more information). As a general rule, if you find an issue you want to work on, you are welcome to open a PR with a fix.

### Making Changes

#### Making Changes Locally

Our setup requires [pnpm](https://pnpm.io/installation). Make sure you have it installed before proceeding.

To make changes locally, follow these steps:

1. Clone the repository: `git clone https://github.com/Polyfrost/website`
2. Navigate to the project directory: `cd website`
3. Install dependencies: `pnpm i`

To run the website:

- `pnpm website dev`

### Pull Request

Once you have finished making your changes, create a pull request (PR) to submit them.

- Fill out the "Ready for review" template to help reviewers understand your changes and the purpose of your PR.
- If you are addressing an existing issue, don't forget to [link your PR to the issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue).
- Enable the checkbox to [allow maintainer edits](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/allowing-changes-to-a-pull-request-branch-created-from-a-fork) so that the branch can be updated for merging.
- Once you submit your PR, a team member will review your proposal. They may ask questions or request additional information.
- You may be asked to make changes before the PR can be merged, either through [suggested changes](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/incorporating-feedback-in-your-pull-request) or pull request comments. You can apply suggested changes directly through the UI. For other changes, you can make them in your fork and commit them to your branch.
- As you update your PR and apply changes, mark each conversation as [resolved](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/commenting-on-a-pull-request#resolving-conversations).
- If you run into any merge issues, refer to this [git tutorial](https://lab.github.com/githubtraining/managing-merge-conflicts) to help you resolve merge conflicts and other issues.

### Your PR is Merged

Congratulations! 🎉🎉 The Polyfrost Nexus team thanks you for your contribution! ✨

Once your PR is merged, your changes will be included in the next release of the relavent application.

### Common Errors

to be added

### Credits

This CONTRIBUTING.md file was inspired by the [github/docs CONTRIBUTING.md](https://github.com/github/docs/blob/main/CONTRIBUTING.md) file, and we extend our gratitude to the original authors.
